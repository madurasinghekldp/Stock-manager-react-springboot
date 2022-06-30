package com.dulan.teaapp.webservices.restfulwebservices;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import antlr.collections.List;

@Repository
public interface DataJpaRepository extends JpaRepository<Data, Long>{
	//List findByUsername(String username);

}
