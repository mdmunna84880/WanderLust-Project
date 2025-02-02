let filters = document.querySelectorAll(".filter");

filters.forEach(filter => {
    filter.addEventListener("click", () => {
        let category = filter.innerText;

        axios.post('/listings/category', { category: category })
            .then(response => {
                let listingsContainer = document.querySelector(".row");
                listingsContainer.innerHTML = ""; // Clear old listings

                response.data.forEach(listing => {
                    let listingCard = `
                        <a href="/listings/${listing._id}" class="listing-links">
                            <div class="card col listing-card">
                                <img src="${listing.image.url}" class="card-img-top" style="height: 20rem" alt="listing-image" />
                                <div class="card-img-overlay">${listing.title}</div>
                                <div class="card-body">
                                    <p class="card-text">
                                        <b>${listing.title}</b><br />
                                        &#8377;${listing.price.toLocaleString("en-IN")} /night
                                        <i class="tax-info">&nbsp; &nbsp; +18% GST</i>
                                    </p>
                                </div>
                            </div>
                        </a>
                    `;
                    listingsContainer.innerHTML += listingCard;
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
