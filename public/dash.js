window.onload = () => {
    getTasks();
    userdata();
}
const userdata = ()=>{
    let user = JSON.parse(window.localStorage.getItem('user'));
    document.getElementById('topFullName').innerHTML = user.firstName+" "+user.lastName;
    document.getElementById('id').value = user.id;
    document.getElementById('username').value = user.username;
    document.getElementById('email').value = user.email;
    document.getElementById('firstName').value = user.firstName;
    document.getElementById('lastName').value = user.lastName
}

const getTasks = () => {
    let user = JSON.parse(window.localStorage.getItem('user'));
    if(!user){
        window.location.href="index.html";
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://todo-webtech.herokuapp.com/todo/findAll", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${user.authenticationToken}`);
    xhr.send()
    xhr.onload = function () {
        var data = JSON.parse(this.responseText);
        document.getElementById('taskBodyTable').innerHTML = ''
        data.map((val, index) => {
            let tr = document.createElement('tr');
            tr.innerHTML = `<tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">
                                ${val.title}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-500">${val.dateTime}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-500">${val.description}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${val.status}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button  class="text-indigo-600 hover:text-indigo-900" onClick="openModal('${val.id}')">Edit</button>
                        <button  class="text-red-600 hover:text-red-900" onClick="deletetask('${val.id}')">Delete</button>
                    </td>
                </tr>`
            document.getElementById('taskBodyTable').append(tr)
        })
    }
}


const openModal = (id) => {
    let user = JSON.parse(window.localStorage.getItem('user'));
    var xhr = new XMLHttpRequest();
    xhr.open("GET", `https://todo-webtech.herokuapp.com/todo/find/${id}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${user.authenticationToken}`);
    xhr.send();
    xhr.onload = function () {
        var data = JSON.parse(this.responseText);
        document.getElementById('up_title').value = data.title;
        document.getElementById('up_id').value = data.id;
        document.getElementById('up_datetime').value = data.dateTime;
        document.getElementById('up_description').value = data.description;
        document.getElementById('up_status').value = data.status
    }
    document.getElementById('mymodal').classList.remove('hidden')
}

const newtask = (e) => {


    if (e.title == '') {
        console.log("Error")
    } else {
        let user = JSON.parse(window.localStorage.getItem('user'));
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://todo-webtech.herokuapp.com/todo/save", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${user.authenticationToken}`);
        xhr.send(JSON.stringify(e));
        xhr.onload = function () {
            alert("Task created");
            document.getElementById('title').value = '';
            document.getElementById('datetime').value = '';
            document.getElementById('description').value = ''
            getTasks();
        }
    }
}
const updateTask = (e) => {


    if (e.title == '') {
        console.log("Error")
    } else {
        let user = JSON.parse(window.localStorage.getItem('user'));
        var xhr = new XMLHttpRequest();
        xhr.open("PATCH", `https://todo-webtech.herokuapp.com/todo/update`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${user.authenticationToken}`);
        xhr.send(JSON.stringify(e));
        xhr.onload = function () {
            alert("Task updated");
            var data = JSON.parse(this.responseText);
            console.log(data)
            if(!data.error){
                document.getElementById('up_id').value = '';
                document.getElementById('up_title').value = '';
                document.getElementById('up_datetime').value = '';
                document.getElementById('up_description').value = '';
                document.getElementById('up_status').value = ''
                document.getElementById('mymodal').classList.add('hidden')
                getTasks();
            }
            
        }
    }
}

const deletetask = (id) => {
    let user = JSON.parse(window.localStorage.getItem('user'));
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", `https://todo-webtech.herokuapp.com/todo/delete/${id}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', `Bearer ${user.authenticationToken}`);
    xhr.send();
    xhr.onload = function () {
        alert("Task Deleted");
        getTasks();
    }
}


const updateProfile = (e)=>{
    if (e.username == '') {
        console.log("Error")
    } else {
        let user = JSON.parse(window.localStorage.getItem('user'));
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", `https://todo-webtech.herokuapp.com/api/auth/update`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${user.authenticationToken}`);
        xhr.send(JSON.stringify(e));
        xhr.onload = function () {
            var data = JSON.parse(this.responseText);
            if(!data.error){
                alert("Profile updated");
                data.data.authenticationToken=user.authenticationToken;
                window.localStorage.setItem('user', JSON.stringify(data.data));
                console.log(data);
                userdata();
            }
            
        }
    }
}