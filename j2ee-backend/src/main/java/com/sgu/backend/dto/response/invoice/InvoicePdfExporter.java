package com.sgu.backend.dto.response.invoice;

import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.*;

import com.sgu.backend.entities.Invoice;
import com.sgu.backend.entities.Ticket;
import jakarta.servlet.http.HttpServletResponse;

import java.awt.*;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class InvoicePdfExporter {
		
		private final Invoice invoice;
		
		public InvoicePdfExporter(Invoice invoice) {
				this.invoice = invoice;
		}
		
		public void export(HttpServletResponse response) throws IOException {
				Document document = new Document(PageSize.A4);
				PdfWriter.getInstance(document, response.getOutputStream());
				
				document.open();
				
				Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
				titleFont.setSize(20);
				titleFont.setColor(Color.BLUE);
				
				Paragraph title = new Paragraph("INVOICE", titleFont);
				title.setAlignment(Paragraph.ALIGN_CENTER);
				document.add(title);
				
				document.add(new Paragraph(" ")); // empty line
				
				// Customer and invoice information
				Font infoFont = FontFactory.getFont(FontFactory.HELVETICA);
				infoFont.setSize(12);
				
				document.add(new Paragraph("Customer: " + invoice.getProfile().getFullname(), infoFont));
				document.add(new Paragraph("Phone: " + invoice.getProfile().getPhone(), infoFont));
				document.add(new Paragraph("Invoice Date: " + formatDate(invoice.getCreatedAt()), infoFont));
				document.add(new Paragraph("Payment Method: " + invoice.getPaymentMethod(), infoFont));
				document.add(new Paragraph("Payment Status: " + invoice.getPaymentStatus(), infoFont));
				
				if (invoice.getTransactionId() != null) {
						document.add(new Paragraph("Transaction ID: " + invoice.getTransactionId(), infoFont));
				}
				if (invoice.getPaymentTime() != null) {
						document.add(new Paragraph("Payment Time: " + formatDate(invoice.getPaymentTime()), infoFont));
				}
				if (invoice.getPaymentNote() != null && !invoice.getPaymentNote().isEmpty()) {
						document.add(new Paragraph("Note: " + invoice.getPaymentNote(), infoFont));
				}
				
				document.add(new Paragraph(" ")); // empty line
				
				PdfPTable table = new PdfPTable(5); // 5 columns
				table.setWidthPercentage(100f);
				table.setWidths(new float[]{2.5f, 2.0f, 2.0f, 3.0f, 2.0f});
				table.setSpacingBefore(10f);
				
				writeTableHeader(table);
				writeTableData(table, invoice.getTickets());
				
				document.add(table);
				
				Paragraph totalParagraph = new Paragraph("Total: " + formatMoney(invoice.getTotalAmount()) + " VND", infoFont);
				totalParagraph.setAlignment(Paragraph.ALIGN_RIGHT);
				totalParagraph.setSpacingBefore(10f);
				document.add(totalParagraph);
				
				document.close();
		}
		
		private void writeTableHeader(PdfPTable table) {
				PdfPCell cell = new PdfPCell();
				cell.setBackgroundColor(Color.LIGHT_GRAY);
				cell.setPadding(5);
				
				Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
				font.setColor(Color.BLACK);
				
				String[] headers = {"Ticket ID", "Price", "Status", "Created Time", "Seat"};
				
				for (String header : headers) {
						cell.setPhrase(new Phrase(header, font));
						table.addCell(cell);
				}
		}
		
		private void writeTableData(PdfPTable table, List<Ticket> tickets) {
				for (Ticket ticket : tickets) {
						table.addCell(ticket.getId());
						table.addCell(formatMoney(ticket.getPrice()));
						table.addCell(ticket.getStatus().name());
						table.addCell(ticket.getCreatedAt().toString());
						
						String seatName = ticket.getSeat() != null && ticket.getSeat().getNumber() != null
								? ticket.getSeat().getNumber().toString()
								: "N/A";
						table.addCell(seatName);
				}
		}
		
		private String formatDate(LocalDateTime date) {
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss dd/MM/yyyy");
				return date.format(formatter);
		}
		
		private String formatMoney(Double amount) {
				return String.format("%,.0f", amount); // no decimal part, comma separator
		}
		
		private String formatMoney(BigDecimal amount) {
				return String.format("%,.0f", amount);
		}
}
