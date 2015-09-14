function toreplace(emailhtml, arrayobject){
	var re1 = /FIRST_NAME/;
	var re2 = /NUM_MONTHS_SINCE_CONTACT/;

	for(var i=0 ;i < arrayobject.length ;i++){
	    var template='';
		if(emailhtml.match(re1)){
			template=emailhtml.replace(re1,arrayobject[i]["firstName"]);
		}
		if(template.match(re2)){
			template=template.replace(re2,arrayobject[i]["numMonthsSinceContact"]);
		}

	}
}