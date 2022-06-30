package com.dulan.teaapp.webservices.restfulwebservices;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class DataHardCodedService {
	
	private static List<Data> data = new ArrayList();
	private static long idCounter = 0;
	
	static {
		data.add(new Data(++idCounter,"Balangoda",25000,new Date()));
		data.add(new Data(++idCounter,"Pelmadulla",15000,new Date()));
		data.add(new Data(++idCounter,"Mahawalathenna",35000,new Date()));
	}
	
	public List<Data> findAllData(){
		return data;
		
	}
	
	public Data save(Data data_id) {
		if(data_id.getId()==-1||data_id.getId()==0) {
			data_id.setId(++idCounter);
			data.add(data_id);
		}
		else {
			deleteById(data_id.getId());
			data.add(data_id);
		}
		return data_id;
	}
	
	public Data deleteById(long id) {
		Data data_id = findById(id);
		if(data_id==null) return null;
		if(data.remove(data_id)) {
			return data_id;
		}
		return null;
	}

	public Data findById(long id) {
		for(Data data_id:data) {
			if(data_id.getId()==id) {
				return data_id;
			}
		}
		return null;
	}

}
