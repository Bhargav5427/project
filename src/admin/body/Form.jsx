import React, { useRef } from 'react'
import { post_user } from '../../api/Api';
import { base_url, post_users } from '../../Constant';

const Form = () => {

    let name = useRef();
    let email = useRef();
    let password = useRef();

    let handlesubmit = async () => {
        const user = {
            name: name.current.value,
            email: email.current.value,
            password: password.current.value,
        }
        let res = await post_user(base_url, post_users, user);
        console.log(res);
    }

    return (
        <>
            <div class="card" style={{ width: "18rem" }}>
                <div class="card-body">

                    <div class="form-group">
                        <label for="name">name</label>
                        <input type="name" class="form-control" id="name" aria-describedby="name" placeholder="Enter name" ref={name} />
                    </div>
                    <div class="form-group">
                        <label for="email">Email address</label>
                        <input type="email" class="form-control" id="email" aria-describedby="email" placeholder="Enter email" ref={email} />
                    </div>
                    <div class="form-group">
                        <label for="Password">Password</label>
                        <input type="Password" class="form-control" id="Password" aria-describedby="Password" placeholder="Enter Password" ref={password} />
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={handlesubmit}>Submit</button>

                </div>
            </div>
        </>
    )
}

export default Form