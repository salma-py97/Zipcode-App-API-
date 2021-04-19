// Listen for submit

document.querySelector('#zipForm').addEventListener('submit', getLocationInfo);

// Listen for delete

document.querySelector('body').addEventListener('click', deleteLocation);

function getLocationInfo(e){
    // Get zip value from input
    const zip = document.querySelector('.zip').value;
    console.log(zip);

    fetch(`https://api.zippopotam.us/us/${zip}`)
        .then (res => {
            // console.log(res.status);
            if (res.status === 200) {
                showIcon('check');
                return res.json();
            } else {
                document.querySelector('#output').innerHTML = 
                `
                <article class = "message is-danger"><div class="message-body">Invalid zipcode, please try again.</div></article>
                `;
                showIcon('remove');
                removeAlertBox();
                throw Error(res.statusText);
            }  
        })
        .then(data => {
            console.log(data);
            // Show Location Info
            let output ='';
            data.places.forEach(place => {
                output += `
                <article class="message is-primary">
                    <div class="message-header">
                        <p>Location Info</p>
                        <button class="delete is-large"></button>
                    </div>
                    <div class="message-body">
                        <ul>
                            <li><strong>City: </strong>${place['place name']}</li>
                            <li><strong>State: </strong>${place['state']}</li>
                            <li><strong>Longitude: </strong>${place['longitude']}</li>
                            <li><strong>Latitude: </strong>${place['latitude']}</li>
                        </ul>
                    </div>
                </article>
                `
            })
            // Insert into output div
            document.querySelector('#output').innerHTML = output;
        })

        .catch(err => console.log(err));

    e.preventDefault();
}
// Show Check or delete icon
function showIcon(icon){
    // Display icons none
    document.querySelector(".icon-remove").style.display = 'none';
    document.querySelector(".icon-check").style.display = 'none';

    // Show the correct icon
    document.querySelector(`.icon-${icon}`).style.display = 'inline-flex';

}

// delete location Box
function deleteLocation(e){
    if (e.target.classList.contains('delete')){
        e.target.parentElement.parentElement.remove();
        document.querySelector('.zip').value = "";
        document.querySelector(".icon-check").remove();
    }
}
function removeAlertBox(){
    document.querySelector(".icon-remove").addEventListener('click', () => {
        document.querySelector('.zip').value = "";
        document.querySelector('.message').remove();
        document.querySelector(".icon-remove").remove();
    })
}