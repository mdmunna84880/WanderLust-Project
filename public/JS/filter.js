let filters = document.querySelectorAll(".filter");
filters.forEach(filter=>{
    filter.addEventListener("click", ()=>{
        let category = filter.innerText;
        console.log(category);
        axios.post('/listings/category', { category: category })
            .then(response => {
                console.log('Response from server:', response.data);  // Log server response
            })
            .catch(error => {
                console.error('Error:', error);  // Handle errors
            });
    });
});