document.addEventListener('DOMContentLoaded', function() {

    // Hide the views for different html pages
    hide_views();

});


// Function to show form to add player
function view_form(){
    document.querySelector("#edit_table").style.display = "none";
    document.querySelector("#add_player").style.display = "block";
}


// Form submission
function add_player() {

    // Attaining the tags
    let name = document.querySelector("#name");
    let weight = document.querySelector("#weight");
    let age = document.querySelector("#age");
    let height = document.querySelector("#height");
    let ethnicity = document.querySelector("#ethnicity");
    let medical = document.querySelector("#medical");
    let position = document.querySelector("#position");

    // Creating entry to be passed to server
    var entry = {
        name: name.value,
        weight: weight.value,
        age: age.value,
        height: height.value,
        ethnicity: ethnicity.value,
        medical: medical.value,
        position: position.value
    };

    // Passing the entry to server to add player
    fetch(`${window.origin}/edit_team/add_player`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(entry),
        cache: "no-cache",
        headers: new Headers({
            "content-type": "application/json"
        })
    })
    .then(response => response.json())
    .then(result => {});

    // Reload Page
    location.reload();

}


// Function to hide different html pages
function hide_views() {
    if(document.querySelector("#add_player")) {
        document.querySelector("#add_player").style.display = "none";
        document.querySelector("#set_roles").style.display = "none";
        document.querySelector("#storage").style.display = "none";
    }

    if(document.querySelector("#profile")) {
        document.querySelector("#edit_profile").style.display = "none";
    }

    if(document.querySelector("#select_gteam")) {
        document.querySelector("#confirm_gteam").style.display = "none";
        document.querySelector("#selected_players").style.display = "none";
        document.querySelector("#view_23").style.display = "none";
        document.querySelector("#select_gteam").style.display = "block";
    }

}


function delete_player(name, id) {

    // Getting user confirmation
    if(confirm(`Are you sure you want to delete ${name}`)) {

        // Fetch API to delete player
        fetch(`${window.origin}/edit_team/delete_player`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(id),
            cache: "no-cache",
            headers: new Headers({
                "content-type": "application/json"
            })
        })
        .then(response => response.json())
        .then(result => {});

        // Reload Page
        location.reload();
    }

}


function view_roles() {

    // Displaying table to set roles and hiding edit table
    document.querySelector("#edit_table").style.display = "none";
    document.querySelector("#set_roles").style.display = "block";

}


function set_role(id, role) {

    var leaders = document.getElementById('storage').getElementsByTagName('div');
    let roles = [];

    // Loop to populate the list
    for(var i = 0; i < leaders.length; i++) {
        roles[i] = leaders[i].id;
    }

    // Updating the storage
    if(roles.includes(role)) {
        // Removing old player
        var remove_player = document.getElementById("storage").querySelector('#' + CSS.escape(role));
        remove_player.remove();

        // Replacing with new player
        let new_leader = document.createElement("div");
        new_leader.id = role;
        new_leader.innerHTML = `${id}`;
        document.getElementById("storage").appendChild(new_leader);
    } else {
        // Adding the player selected to list
        let new_leader = document.createElement("div");
        new_leader.id = role;
        new_leader.innerHTML = `${id}`;
        document.getElementById("storage").appendChild(new_leader);
    }

    // Getting the name of the player
    fetch(`${window.origin}/role`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(id),
        cache: "no-cache",
        headers: new Headers({
            "content-type": "application/json"
        })
    })
    .then(response => response.json())
    .then(result => {
        // Updating the view in the DOM
        if(role == "c") {
            document.querySelector("[data-name=" + CSS.escape(role) + "]").innerHTML = `<b>Captain:</b> ${result}`;
        } else if(role == "vc") {
            document.querySelector("[data-name=" + CSS.escape(role) + "]").innerHTML = `<b>Vice Captain:</b> ${result}`;
        }  else if(role == "gk") {
            document.querySelector("[data-name=" + CSS.escape(role) + "]").innerHTML = `<b>Goal Kicker:</b> ${result}`;
        } else {
            document.querySelector("[data-name=" + CSS.escape(role) + "]").innerHTML = `<b>Place Kicker:</b> ${result}`;
        }
    });

}


function confirm_roles() {

    // Assigning variables
    let cap = document.querySelector("[data-name=c]").innerHTML;
    let vice = document.querySelector("[data-name=vc]").innerHTML;
    let goalk = document.querySelector("[data-name=gk]").innerHTML;
    let placek = document.querySelector("[data-name=pk]").innerHTML;

    // Ridding of the unwanted strings
    cap = cap.replace("<b>Captain:</b> ", "");
    vice = vice.replace("<b>Vice Captain:</b> ", "");
    goalk = goalk.replace("<b>Goal Kicker:</b> ", "");
    placek = placek.replace("<b>Place Kicker:</b> ", "");

    // Preparing entry
    entry = {
        cap: cap,
        vice: vice,
        goalk: goalk,
        placek: placek
    }

    // Sending info to be stored
    fetch(`${window.origin}/confirm_role`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(entry),
        cache: "no-cache",
        headers: new Headers({
            "content-type": "application/json"
        })
    })
    .then(response => response.json())
    .then(result => {});

    // Reload page
    location.reload();
}


function view_edit() {

    // Hiding and showing views
    document.querySelector("#profile").style.display = "none";
    document.querySelector("#edit_profile").style.display = "block";

}


function view_profile() {

    // Hiding and showing views
    document.querySelector("#edit_profile").style.display = "none";
    document.querySelector("#profile").style.display = "block";

}


function save_changes(id) {

    // Obtaining the values from input
    let name = document.querySelector("#iptname");
    let weight = document.querySelector("#iptweight");
    let age = document.querySelector("#iptage");
    let height = document.querySelector("#iptheight");
    let ethnicity = document.querySelector("#ipteth");
    let position = document.querySelector("#iptpos");
    let medical = document.querySelector("#iptmed");

    // Making entry variable to pass to server
    var entry = {
        id: id,
        name: name.value,
        weight: weight.value,
        age: age.value,
        height: height.value,
        ethnicity: ethnicity.value,
        medical: medical.value,
        position: position.value
    }

    // Passing the info to server
    fetch(`${window.origin}/edit_player`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(entry),
        cache: "no-cache",
        headers: new Headers({
            "content-type": "application/json"
        })
    })
    .then(response => response.json())
    .then(result => {});

    // Reload Page
    location.reload();

}


// Function to show to extended squad for user to pick 23
function select_gteam() {
    document.querySelector('#select_gteam').style.display = "none";
    document.querySelector('#confirm_gteam').style.display = "block";
}


// Function
function player_selected(id) {

    var selected = document.getElementById('selected_players').getElementsByTagName('div');
    let id_list = [];

    // Loop to populate the list
    for(var i = 0; i < selected.length; i++) {
        id_list[i] = selected[i].innerHTML;
    }

    if(id_list.includes(id)) {
        // Removing player
        var player = document.getElementById('selected_players').querySelector('#' + CSS.escape(id));
        player.remove();

    } else {
        // Adding the player selected to list
        let playerid = document.createElement("div");
        playerid.id = id;
        playerid.innerHTML = `${id}`;
        document.getElementById("selected_players").appendChild(playerid);
    }

}


// Function to confirm the playing 23
function confirm_gteam() {

    // Getting the div with the team
    var team = document.getElementById('selected_players').getElementsByTagName('div');
    let id_list = [];

    // Loop to populate the list
    for(var i = 0; i < team.length; i++) {
        id_list[i] = team[i].innerHTML;
    }

    // Removing the empty div
    id_list.splice(0,1);

    // Checking that 23 players were selected
    if(id_list.length < 23){
        // If players is less than 23
        document.querySelector("#message2").innerHTML = "Must select at least 23 players";
    } else if(id_list.length > 23) {
        // If players selected exceeds 23
        document.querySelector("#message2").innerHTML = "Must select at least 23 players";
    } else {
        fetch(`${window.origin}/set_playing23`, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(id_list),
            cache: "no-cache",
            headers: new Headers({
                "content-type": "application/json"
            })
        })
        .then(response => response.json())
        .then(result => {});

        function reload() {
            location.reload();
        }

        // Reload page
        setTimeout(reload, 1000);
    }

}


// Function to show the currently chosen playing 23
function view_23() {
    document.querySelector("#select_gteam").style.display = "none";
    document.querySelector("#view_23").style.display = "block";
}
