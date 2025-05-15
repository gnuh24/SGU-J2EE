package com.sgu.backend.external.vnpay;

import com.sgu.backend.entities.Invoice;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class VNPAYService {
		
		// Hàm tạo giao dịch trên VN Pay trả về link giao dịch bên VN PAY
		public String createOrder(HttpServletRequest request, Double amount, String orderInfor, String urlReturn){
				//Các bạn có thể tham khảo tài liệu hướng dẫn và điều chỉnh các tham số
				String vnp_Version = "2.1.0";
				String vnp_Command = "pay";
				String vnp_TxnRef = VNPAYConfig.getRandomNumber(8);
				String vnp_IpAddr = VNPAYConfig.getIpAddress(request);
				String vnp_TmnCode = VNPAYConfig.vnp_TmnCode;
				String orderType = "order-type";
				
				Map<String, String> vnp_Params = new HashMap<>();
				vnp_Params.put("vnp_Version", vnp_Version);
				vnp_Params.put("vnp_Command", vnp_Command);
				vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
				int amountInt = amount.intValue() * 100;
				vnp_Params.put("vnp_Amount", String.valueOf(amountInt));
				vnp_Params.put("vnp_CurrCode", "VND");
				
				vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
				vnp_Params.put("vnp_OrderInfo", orderInfor);
				vnp_Params.put("vnp_OrderType", orderType);
				
				String locate = "vn";
				vnp_Params.put("vnp_Locale", locate);
				
				urlReturn += VNPAYConfig.vnp_Returnurl;
				vnp_Params.put("vnp_ReturnUrl", urlReturn);
				vnp_Params.put("vnp_IpAddr", vnp_IpAddr);
				
				Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
				SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
				String vnp_CreateDate = formatter.format(cld.getTime());
				vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
				
				cld.add(Calendar.MINUTE, 15);
				String vnp_ExpireDate = formatter.format(cld.getTime());
				vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);
				
				List fieldNames = new ArrayList(vnp_Params.keySet());
				Collections.sort(fieldNames);
				StringBuilder hashData = new StringBuilder();
				StringBuilder query = new StringBuilder();
				Iterator itr = fieldNames.iterator();
				while (itr.hasNext()) {
						String fieldName = (String) itr.next();
						String fieldValue = (String) vnp_Params.get(fieldName);
						if ((fieldValue != null) && (fieldValue.length() > 0)) {
								//Build hash data
								hashData.append(fieldName);
								hashData.append('=');
								try {
										hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
										//Build query
										query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
										query.append('=');
										query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
								} catch (UnsupportedEncodingException e) {
										e.printStackTrace();
								}
								if (itr.hasNext()) {
										query.append('&');
										hashData.append('&');
								}
						}
				}
				String queryUrl = query.toString();
				String salt = VNPAYConfig.vnp_HashSecret;
				String vnp_SecureHash = VNPAYConfig.hmacSHA512(salt, hashData.toString());
				queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
				String paymentUrl = VNPAYConfig.vnp_PayUrl + "?" + queryUrl;
				return paymentUrl;
		}
		
		public int orderReturn(HttpServletRequest request){
				Map fields = new HashMap();
				for (Enumeration params = request.getParameterNames(); params.hasMoreElements();) {
						String fieldName = null;
						String fieldValue = null;
						try {
								fieldName = URLEncoder.encode((String) params.nextElement(), StandardCharsets.US_ASCII.toString());
								fieldValue = URLEncoder.encode(request.getParameter(fieldName), StandardCharsets.US_ASCII.toString());
						} catch (UnsupportedEncodingException e) {
								e.printStackTrace();
						}
						if ((fieldValue != null) && (fieldValue.length() > 0)) {
								fields.put(fieldName, fieldValue);
						}
				}
				
				String vnp_SecureHash = request.getParameter("vnp_SecureHash");
				if (fields.containsKey("vnp_SecureHashType")) {
						fields.remove("vnp_SecureHashType");
				}
				if (fields.containsKey("vnp_SecureHash")) {
						fields.remove("vnp_SecureHash");
				}
				String signValue = VNPAYConfig.hashAllFields(fields);
				if (signValue.equals(vnp_SecureHash)) {
						if ("00".equals(request.getParameter("vnp_TransactionStatus"))) {
								return 1;
						} else {
								return 0;
						}
				} else {
						return -1;
				}
		}
		
		public String getPaymentNote(String responseCode, String transactionStatus) {
				switch (transactionStatus) {
						case "00": return "Giao dịch thành công.";
						case "02": return "Giao dịch thất bại.";
				}
				
				switch (responseCode) {
						case "24": return "Khách hàng đã hủy giao dịch.";
						case "07": return "Giao dịch bị nghi ngờ gian lận.";
						case "09": return "Thẻ/Tài khoản không đủ số dư.";
						case "10": return "Giao dịch đang xử lý, chưa có kết quả.";
						case "99": return "Giao dịch đã được hoàn tiền.";
						case "51": return "Giao dịch hết hạn do quá thời gian thanh toán.";
				}
				
				return "Giao dịch không xác định.";
		}
		
		
		public Invoice.PaymentStatus getPaymentStatus(String responseCode, String transactionStatus) {
				if ("00".equals(transactionStatus)) {
						return Invoice.PaymentStatus.PAID; // ✅ Giao dịch thành công
				}
				if ("02".equals(transactionStatus)) {
						return Invoice.PaymentStatus.FAILED; // ❌ Giao dịch thất bại
				}
				if ("24".equals(responseCode)) {
						return Invoice.PaymentStatus.CANCELLED; // ❌ Khách hàng hủy giao dịch
				}
				if ("07".equals(responseCode)) {
						return Invoice.PaymentStatus.DISPUTED; // ⚠️ Giao dịch bị nghi ngờ gian lận hoặc bị khiếu nại
				}
				if ("09".equals(responseCode)) {
						return Invoice.PaymentStatus.FAILED; // ❌ Thẻ/Tài khoản không đủ số dư
				}
				if ("10".equals(responseCode)) {
						return Invoice.PaymentStatus.PROCESSING; // ⏳ Giao dịch đang xử lý, chưa có kết quả
				}
				if ("99".equals(responseCode)) {
						return Invoice.PaymentStatus.REFUNDED; // 🔄 Giao dịch đã hoàn tiền
				}
				if ("51".equals(responseCode)) {
						return Invoice.PaymentStatus.EXPIRED; // ⌛ Giao dịch hết hạn do quá thời gian thanh toán
				}
				return Invoice.PaymentStatus.PENDING; // ⏳ Đang chờ thanh toán hoặc chưa xác định
		}
		
//		public Invoice.PaymentStatus getInvoiceStatus(Invoice.PaymentStatus paymentStatus) {
//				return (paymentStatus == Invoice.PaymentStatus.PAID) ? Invoice.PaymentStatus.PENDING : Invoice.PaymentStatus.SYSTEM_CANCELED;
//		}
		
}

