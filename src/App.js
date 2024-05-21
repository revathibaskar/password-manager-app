import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

const inititalPasswordsList = []

class App extends Component {
  state = {
    passwordsList: inititalPasswordsList,
    isShow: false,
    website: '',
    username: '',
    password: '',
    searchInput: '',
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onAddDetailsList = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newDetail = {
      id: uuidv4(),
      website,
      username,
      password,
    }

    this.setState(prev => ({
      passwordsList: [...prev.passwordsList, newDetail],
      username: '',
      website: '',
      password: '',
    }))
  }

  onShowPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onRenderNoPassword = () => {
    return (
      <div className="no-password-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
          className="no-password-style"
        />
        <p className="form-heading">No Passwords</p>
      </div>
    )
  }

  onDelete = id => {
    const {passwordsList} = this.state
    const filterList = passwordsList.filter(each => each.id !== id)
    this.setState({passwordsList: filterList})
  }

  render() {
    const {
      website,
      username,
      password,
      passwordCount,
      isShow,
      passwordsList,
      searchInput,
    } = this.state

    const filterList = passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="main-bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo-style"
        />
        <div className="bg-top-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="pass-man-sm-style"
          />
          <form className="bg-form" onSubmit={this.onAddDetailsList}>
            <h1 className="form-heading">Add New Password</h1>
            <div className="input-img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-img-style"
              />
              <input
                className="input-style"
                type="text"
                placeholder="Enter Website"
                value={website}
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="input-img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-img-style"
              />
              <input
                className="input-style"
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-img-style"
              />
              <input
                className="input-style"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="add-btn-style">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="pass-man-lg-style"
          />
        </div>
        <div className="bg-bottom-container">
          <div className="password-search-container">
            <div className="pass-count-container">
              <h1 className="form-heading">Your Passwords</h1>
              <p className="password-count">{filterList.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="input-img-style"
              />
              <input
                type="search"
                placeholder="search"
                className="input-style"
                value={searchInput}
                onChange={this.onChangeSearch}
              />
            </div>
          </div>
          <hr />
          <div className="checkbox-container">
            <input
              id="checkbox"
              type="checkbox"
              className="chk-box-style"
              onClick={this.onShowPassword}
            />
            <label htmlFor="checkbox" className="form-heading">
              Show Passwords
            </label>
          </div>
          {filterList.length === 0 ? (
            this.onRenderNoPassword()
          ) : (
            <ul className="ul-list-container">
              {filterList.map(eachValue => (
                <li
                  className="list-container"
                  id={eachValue.id}
                  key={eachValue.id}
                >
                  <div className="name-container">
                    <p className="initial-style">
                      {eachValue.website[0].toUpperCase()}
                    </p>
                    <div>
                      <p className="list-head">{eachValue.website}</p>
                      <p className="list-head">{eachValue.username}</p>
                      {isShow ? (
                        <p className="list-head">{eachValue.password}</p>
                      ) : (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          className="stars-style"
                          alt="stars"
                        />
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    data-testid="delete"
                    onClick={() => this.onDelete(eachValue.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      className="delete-style"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
