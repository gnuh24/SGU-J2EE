package com.sgu.backend.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateFormat {
		public static String formatVnpayDate(String vnpPayDate) {
				if (vnpPayDate == null || vnpPayDate.length() != 14) {
						return "Invalid Date";
				}
				
				try {
						DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
						DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
						
						LocalDateTime dateTime = LocalDateTime.parse(vnpPayDate, inputFormatter);
						return dateTime.format(outputFormatter);
				} catch (Exception e) {
						return "Invalid Date";
				}
		}
		
		public static LocalDateTime convertStringToLocalDateTime(String paymentTime) {
				if (paymentTime == null || paymentTime.isEmpty()) {
						return null;
				}
				
				try {
						// VNPAY gửi thời gian theo định dạng yyyyMMddHHmmss, cần chuyển đổi
						DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
						return LocalDateTime.parse(paymentTime, formatter);
				} catch (Exception e) {
						throw new RuntimeException("Lỗi khi chuyển đổi paymentTime: " + paymentTime, e);
				}
		}
		
		
}
