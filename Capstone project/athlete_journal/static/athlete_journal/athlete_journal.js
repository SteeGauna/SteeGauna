document.addEventListener('DOMContentLoaded', function() {

    // hide the views not needed at first
    hide_views();

});

function getCookie(name){
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length == 2) return parts.pop().split(';').shift();
}

function hide_views() {
    // edit.html
    if(document.querySelector("#edit_table")) {
        document.querySelector("#add_log").style.display = "none";
    }

    // log.html
    if(document.querySelector("#view_log")) {
        document.querySelector("#edit_log").style.display = "none";
    }
}


function add_log() {
    // hiding the table and displaying the form to add log
    document.querySelector("#edit_table").style.display = "none";
    document.querySelector("#add_log").style.display = "block";

    // When form is submitted
    document.querySelector("#add_form").onsubmit = function() {

        // querying the values submitted
        let log = document.querySelector("#log").value;
        let train_log = document.querySelector("#train_log").value;
        let train_sess = document.querySelector("#train_sess").value;
        let meals = document.querySelector("#meals").value;
        let sleep_hrs = document.querySelector("#sleep_hrs").value;
        let feeling_log = document.querySelector("#feeling_log").value;

        // making a dict to pass to use in fetch
        var entry ={
            log: log,
            train_log: train_log,
            train_sess: train_sess,
            meals: meals,
            sleep_hrs: sleep_hrs,
            feeling_log: feeling_log
        };

        // using fetch to pass the info to python to add to database
        fetch("add", {
            method: 'POST',
            headers: {"Content-type": "application/json", "X-CSRFToken": getCookie("csrftoken")},
            body: JSON.stringify({
                content: entry
            })
        })
        .then(response => response.json())
        .then(log => {})

        location.reload();
        return false;
    }
}


function view_edit() {
    // viewing the table in edit.html
    document.querySelector("#edit_table").style.display = "block";
    document.querySelector("#add_log").style.display = "none";
}

function view_log() {
    // viewing the log in log.html
    document.querySelector("#view_log").style.display = "block";
    document.querySelector("#edit_log").style.display = "none";
    clear_editforms();
}

function clear_editforms() {
    document.querySelector("#heading").innerHTML = "";
    document.querySelector("#ed_log").innerHTML = "";
    document.querySelector("#ed_training").innerHTML = "";
    document.querySelector("#ed_trainSess").innerHTML = "";
    document.querySelector("#ed_meal").innerHTML = "";
    document.querySelector("#ed_sleepHrs").innerHTML = "";
    document.querySelector("#ed_feelingLog").innerHTML = "";
    document.querySelector("#buttons").innerHTML = "";
}

function delete_log(id) {
    // are you sure prompt
    const response = confirm("Are you sure you want to delete this log?");

    // if statement to check
    if(response){
        // fetch to delete form server
        fetch(`/remove/${id}`)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            location.reload();
        })
    } else {
        location.reload();
    }
}


function edit_log(id) {

    fetch(`ret_log/${id}`)
    .then(response => response.json())
    .then(log => {

        // create divs for input to edit log
        make_divs(log);

        // specifying the values of select tags
        document.querySelector("#train_sess").value = log.train_sess;
        document.querySelector("#sleep_hrs").value = log.sleep_hrs;

        // displaying edit_log
        document.querySelector("#view_log").style.display = "none";
        document.querySelector("#edit_log").style.display = "block";

    })
}


// makes the divs for input to edit log in log.html
function make_divs(log) {
    // heading
    let heading = document.createElement('h1');
    heading.innerHTML = 'Edit Log';

    // Log textarea
    let ed_log = document.createElement('textarea');
    ed_log.innerHTML = `${log.log}`;
    ed_log.className = "txt";
    ed_log.id = "log";
    ed_log.placeholder = "What did you do today?";

    // train_log textarea
    let ed_trainLog = document.createElement('textarea');
    ed_trainLog.innerHTML = `${log.train_log}`;
    ed_trainLog.className = "txt";
    ed_trainLog.id = "train_log";
    ed_trainLog.placeholder = "What was your training program for today?";

    // train_sess input
    let ed_trainSess = document.createElement('div');
    ed_trainSess.innerHTML =
    `<label for="train_sess">Number of training sessions today.</label>
    <select id="train_sess">
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
    </select>
    `;

    // meals textarea
    let ed_meal = document.createElement('textarea');
    ed_meal.innerHTML = `${log.meals}`;
    ed_meal.className = "txt";
    ed_meal.id = "meals";
    ed_meal.placeholder = "What did you eat today?";

    // sleep_hrs input
    let ed_sleepHrs = document.createElement('div');
    ed_sleepHrs.innerHTML =
    `<label for="sleep_hrs">How long was your sleep?</label>
    <select id="sleep_hrs">
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
    </select>`;

    // feeling_log textarea
    let ed_feelingLog = document.createElement('textarea');
    ed_feelingLog.innerHTML = `${log.feeling_log}`;
    ed_feelingLog.className = "txt";
    ed_feelingLog.id = "feeling_log";
    ed_feelingLog.placeholder = "How did you feel before, during and after training?";

    // buttons
    let btl = document.createElement('button');
    btl.innerHTML = "Back to log";
    btl.className = "btn btn-primary edtlogbtn";
    btl.setAttribute('onclick', 'view_log()');

    let sv = document.createElement('button');
    sv.innerHTML = "Save Changes";
    sv.className ="btn btn-primary edtlogbtn";
    sv.setAttribute('onclick', `save_edit(${log.id})`);

    // appending the input boxes to be edited
    document.querySelector("#heading").append(heading);
    document.querySelector("#ed_log").append(ed_log);
    document.querySelector("#ed_training").append(ed_trainLog);
    document.querySelector("#ed_trainSess").append(ed_trainSess);
    document.querySelector("#ed_meal").append(ed_meal);
    document.querySelector("#ed_sleepHrs").append(ed_sleepHrs);
    document.querySelector("#ed_feelingLog").append(ed_feelingLog);
    document.querySelector("#buttons").append(btl);
    document.querySelector("#buttons").append(sv);
}


function save_edit(id) {

    // making entry to pass to fetch
    entry = {
        id: id,
        log: document.querySelector("#log").value,
        train_log: document.querySelector("#train_log").value,
        train_sess: document.querySelector("#train_sess").value,
        meals: document.querySelector("#meals").value,
        sleep_hrs: document.querySelector("#sleep_hrs").value,
        feeling_log: document.querySelector("#feeling_log").value
    };

    // using fetch to pass the info to python to add to database
    fetch("/edit", {
        method: 'POST',
        headers: {"Content-type": "application/json", "X-CSRFToken": getCookie("csrftoken")},
        body: JSON.stringify({
            content: entry
        })
    })
    .then(response => response.json())
    .then(result => {
        location.reload()
    })
}
