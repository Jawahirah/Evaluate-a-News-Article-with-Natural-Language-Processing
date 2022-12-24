function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value.replace(/ /g,'');
    Client.checkForName(formText)
    console.log("::: Form Submitted :::")
    if(formText.match(/^(http|https):\/\/[^ "]+$/ig)){

        postData(formText)
  .then((data)=>{
    document.getElementById('text').innerHTML='Text: ' + data.text
    document.getElementById('score_tag').innerHTML='Polarity: ' + data.score_tag
    document.getElementById('agreement').innerHTML='Agreement ' + data.agreement
    document.getElementById('subjectivity').innerHTML='Subjectivity: ' + data.subjectivity
    document.getElementById('confidence').innerHTML='Confidence: ' + data.confidence
    document.getElementById('irony').innerHTML='Irony: ' + data.irony
  
  })
        
    }else{
    alert('Invalid URL')

    }
   

}


const postData= async (value)=>{

    const response= await fetch('http://localhost:8081/info',{
      method: "POST",
      credentials: 'same-origin',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json'
      },
      // Body data type must match "Content-Type" header        
      body: JSON.stringify({url:value})
  });
  try{
    const data= await response.json()
    return data
  
  }catch(err){
    console.log(err)
  }
  
  
  
  }
  
  
  
  

export { handleSubmit }
