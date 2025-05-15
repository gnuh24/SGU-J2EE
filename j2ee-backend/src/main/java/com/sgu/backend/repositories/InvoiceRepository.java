package com.sgu.backend.repositories;

import com.sgu.backend.dto.response.statistics.DailyRevenueProjection;
import com.sgu.backend.dto.response.statistics.ScheduleStatisticsProjection;
import com.sgu.backend.entities.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice,String> , JpaSpecificationExecutor<Invoice> {
    long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
	
	List<Invoice> findByProfile_Id(String id);

    @Query("SELECT SUM(i.totalAmount) FROM Invoice i WHERE i.createdAt BETWEEN :start AND :end")
    Double sumTotalAmountByCreatedAtBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
    @Query("SELECT SUM(SIZE(i.tickets)) FROM Invoice i WHERE i.createdAt BETWEEN :start AND :end")
    Long countTicketsSoldByMonth(@Param("start") LocalDateTime start,
                                 @Param("end") LocalDateTime end);
    @Query(value = """
    SELECT 
        s.id AS scheduleId,
        CONCAT(ds.name, ' -> ', as_.name) AS routeName,
        s.departureTime AS departureTime,
        COUNT(t.id) AS totalTickets,
        COUNT(DISTINCT i.id) AS totalInvoices,
        SUM(i.totalAmount) AS totalRevenue
    FROM invoice i
    JOIN ticket t ON t.invoiceId = i.id
    JOIN schedule s ON t.scheduleId = s.id
    JOIN route r ON s.routeId = r.id
    JOIN coachStation ds ON r.departureStationId = ds.id
    JOIN coachStation as_ ON r.arrivalStationId = as_.id
    WHERE i.createdAt BETWEEN :start AND :end
    GROUP BY s.id, s.departureTime, ds.name, as_.name
    ORDER BY COUNT(t.id) DESC
""", nativeQuery = true)
    List<ScheduleStatisticsProjection> getTopSchedules(@Param("start") LocalDateTime start,
                                                       @Param("end") LocalDateTime end);
    @Query("SELECT DATE(i.createdAt) AS date, SUM(i.totalAmount) AS totalRevenue, COUNT(i.id) AS totalInvoices " +
            "FROM Invoice i " +
            "WHERE i.createdAt BETWEEN :startDate AND :endDate " +
            "GROUP BY DATE(i.createdAt) " +
            "ORDER BY DATE(i.createdAt)")
    List<DailyRevenueProjection> getDailyRevenueBetween(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );


}
