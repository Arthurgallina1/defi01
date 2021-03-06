import React from 'react'

export default function Lottery({ account, getBalance }) {
    return (
        <div className="mt-5">
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a
        className="navbar-brand col-sm-3 col-md-2 mr-0"
        href="http://www.dappuniversity.com/bootcamp"
        target="_blank"
        rel="noopener noreferrer"
      >
        Color Tokens
      </a>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
          <small className="text-white"><span id="account">{account}</span></small>
        </li>
      </ul>
    </nav>
    <div>
        <button onClick={getBalance}>Get balance</button>
    </div>
        </div>
        
    )
}
