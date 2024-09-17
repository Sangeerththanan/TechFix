package com.techfix.Repo;

import org.springframework.stereotype.Repository;

import com.techfix.Model.Order;

@Repository
public interface OrderRepo extends GenericRepo<Order, Long>{

}
