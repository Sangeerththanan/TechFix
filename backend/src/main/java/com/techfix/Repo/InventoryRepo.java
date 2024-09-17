package com.techfix.Repo;

import org.springframework.stereotype.Repository;

import com.techfix.Model.Inventory;

@Repository
public interface InventoryRepo extends GenericRepo<Inventory, Long>{

}
