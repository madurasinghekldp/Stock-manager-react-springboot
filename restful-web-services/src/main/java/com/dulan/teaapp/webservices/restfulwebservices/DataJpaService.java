package com.dulan.teaapp.webservices.restfulwebservices;


import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import ch.qos.logback.core.net.LoginAuthenticator;
import net.bytebuddy.implementation.bind.MethodDelegationBinder.BindingResolver.Unique;







@RestController
@CrossOrigin(origins="http://localhost:3000")
public class DataJpaService {
	//@Autowired
	//private DataHardCodedService dataService;

	@Autowired
	private DataJpaRepository dataService;
	
	@GetMapping("/jpa/user/login")
	public ResponseEntity<Void> login(){
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/jpa/user/{username}/data")
	public List<Data> getAllData(@PathVariable String username){
		return dataService.findAll();
		//return dataService.findAll();
		
	}
	
	@GetMapping("/jpa/user/{username}/data/{id}")
	public Data getData(@PathVariable String username,@PathVariable long id){
		return dataService.findById(id).get();
		
	}
	
	@DeleteMapping("/jpa/user/{username}/data/{id}")
	public ResponseEntity<Void> deleteData(@PathVariable String username,@PathVariable long id){
		dataService.deleteById(id);
		
		return ResponseEntity.noContent().build();
		
	}
	
	@PutMapping("/jpa/user/{username}/data/{id}")
	public ResponseEntity<Data> updateData(@PathVariable String username,@PathVariable long id, @RequestBody Data data_id){

		Data updateddata=dataService.save(data_id);
		return new ResponseEntity<Data>(data_id,HttpStatus.OK);
	}
	
	@PostMapping("/jpa/user/{username}/data")
	public ResponseEntity<Void> createData(@PathVariable String username, @RequestBody Data data_id){
		
		Data createddata=dataService.save(data_id);
		URI uri=ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createddata.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
}
