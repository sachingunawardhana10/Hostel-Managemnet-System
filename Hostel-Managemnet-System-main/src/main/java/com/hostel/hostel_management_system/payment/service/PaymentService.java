package com.hostel.hostel_management_system.payment.service;

import com.hostel.hostel_management_system.payment.entity.Payment;
import com.hostel.hostel_management_system.payment.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository repository;

    public PaymentService(PaymentRepository repository) {
        this.repository = repository;
    }

    public List<Payment> getAllRooms() {
        return repository.findAll();
    }

    public Payment getPaymentById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Invalid Payment"));
    }

    public Payment savePayment(Payment payment) {
        return repository.save(payment);
    }

    public Payment updatePayment(Long id,
                           Payment payment) {

        Payment existing = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Invalid Payment"));

        existing.setStatus(payment.getStatus());
        existing.setPaymentDate(payment.getPaymentDate());
        existing.setPaymentMethod(payment.getPaymentMethod());
        existing.setAmount(payment.getAmount());
        existing.setResidentId(payment.getResidentId());

        return repository.save(existing);
    }

    public void deletePayment(Long id) {
        repository.deleteById(id);
    }

    public List<Payment> getAllPayments() {
        return repository.findAll();
    }
}