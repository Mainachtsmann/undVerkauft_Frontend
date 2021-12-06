import { Alert, Button, FormControlLabel, FormGroup, Switch, TextField } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router"
import userLogin from "../../api/userLogin"
import userRegister from "../../api/userRegister"
import styles from "./LoginScene.module.css"

function LoginScene(props) {
    const navigate = useNavigate()
    const { useLogin } = props
    const [isLoggedIn, setIsLoggedIn] = useLogin

    const [user, setUser] = useState({ login: "", username: "", email: "", password: "", passwordConfirm: "" })
    const { login, username, email, password, passwordConfirm } = user
    function updateUser(updateEl) {
        setUser((prevUser) => ({ ...prevUser, ...updateEl }))
    }

    const [registerChecked, setRegisterChecked] = useState(false)

    const [error, setError] = useState()

    function tryLogin() {
        userLogin(login, password)
            .then(() => {
                console.log("LOGED IN")
                setIsLoggedIn(true)
                navigate("/")
            })
            .catch((e) => {
                console.log("Login failed", e.response)
                setError(e.response.data)
            })
    }

    function tryRegister() {
        userRegister(username, email, password, passwordConfirm)
            .then(() => {
                console.log("REGISTERED")
                setIsLoggedIn(true)
                navigate("/")
            })
            .catch((e) => {
                console.log("Register failed", e.response)
                //TODO WHWHHHHYYYHYHYHYHYHYHHYHYHWHWHYHWEHAHWHHYHWE think of a clean solution maybe later on the endpoint :)
                if (e.response.data.messages) {
                    setError(e.response.data.messages[0])
                } else {
                    setError(e.response.data)
                }
            })
    }

    const loginComponents = (
        <>
            <div>
                <TextField
                    id="login"
                    label="Username or E-Mail"
                    variant="outlined"
                    value={login}
                    onChange={(e) => updateUser({ login: e.target.value })}
                />
            </div>
            <div>
                <TextField
                    id="password"
                    label="Passwort"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => updateUser({ password: e.target.value })}
                />
            </div>
            <Button variant="contained" onClick={tryLogin}>
                Login
            </Button>
        </>
    )

    const registerComponents = (
        <>
            <div>
                <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => updateUser({ username: e.target.value })}
                />
            </div>
            <div>
                <TextField id="email" label="E-Mail" variant="outlined" value={email} onChange={(e) => updateUser({ email: e.target.value })} />
            </div>
            <div>
                <TextField
                    id="password"
                    label="Passwort"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => updateUser({ password: e.target.value })}
                />
            </div>
            <div>
                <TextField
                    id="passwordConfirm"
                    label="Passwort wiederhohlen"
                    variant="outlined"
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => updateUser({ passwordConfirm: e.target.value })}
                />
            </div>
            <Button variant="contained" onClick={tryRegister}>
                Register
            </Button>
        </>
    )

    return (
        <div className={styles.centerLogin}>
            <div className={styles.LoginCard}>
                {error ? <Alert severity="error">{error}</Alert> : null}

                {registerChecked ? registerComponents : loginComponents}

                <div>
                    <p>Noch kein Account vorhanden?</p>
                </div>
                <div className={styles.RegisterSliderDiv}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={registerChecked}
                                    onChange={(e) => {
                                        setRegisterChecked(e.target.checked)
                                        setError("")
                                    }}
                                />
                            }
                            label="Registrieren"
                        />
                    </FormGroup>
                </div>
            </div>
        </div>
    )
}

export default LoginScene
