import React from 'react'

const Header = () => {
    const userRole = sessionStorage.getItem('userRole');
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary p-4 border">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Employee App</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                       
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/userform">Users List</a>
                            </li>
                            {userRole === 'admin' && (
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/viewform">Form</a>
                            </li>
                             )}
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/">Log out</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header