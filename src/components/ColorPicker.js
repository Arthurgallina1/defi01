import React from 'react'

export default function ColorPicker({ colors, account, mint, ref }) {
    return (
        <div>
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
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 d-flex text-center">
          <div className="content mr-auto ml-auto">
            <h1>Issue Token</h1>
            <form onSubmit={(event) => {
              event.preventDefault()
              const color = ref.current.value
              mint(color)
              // this.mint(color)
            }}>
              <input
                type='text'
                className='form-control mb-1'
                placeholder='e.g. #FFFFFF'
                ref={ref}
              />
              <input
                type='submit'
                className='btn btn-block btn-primary'
                value='MINT'
              />
            </form>
          </div>
        </main>
      </div>
      <hr/>
      <div className="row text-center">
        {colors.map((color, key) => {
          return(
            <div key={key} className="col-md-3 mb-3">
              <div className="token" style={{ backgroundColor: color }}></div>
              <div>{color}</div>
            </div>
          )
        })}
      </div>
    </div>
        </div>
    )
}
