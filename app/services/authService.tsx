import { BACKEND_URL } from './const';

export type AuthData = {
    userId: number;
    role: string;
    isBanned: number;
  };

  const signIn = (_login: string, _password: string): Promise<AuthData> => {
    console.log(_login, _password);
    return new Promise((resolve, reject) => {
        async function sign() {
            const response = await fetch(
                BACKEND_URL+'auth/login',{
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        login: _login,
                        password: _password,
                    }),
                }
            );
            if (response.ok) {
                const json = await response.json();
                console.log('json', json)
                const data = {
                    userId: json.id,
                    role: json.role,
                    isBanned: json.isBanned
                }
                resolve(data);
            } else {
                reject('err')
            }
        }
        
        sign() 
    });    

    /*
    return new Promise((resolve, reject) => {
        
        console.log('logpass', _login, _password);
        return fetch('http://82.202.194.12:4000/auth/signin', {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                login: _login,
                password: _password,
            }),
        }).then(response => { 
            console.log('response', response);
            console.log('resolve', resolve);
            if (response.ok) {
                resolve(response)
            } else {
                reject(response)
            }

        })

    });
    */
  
};
  
  export const authService = {
    signIn,
  };
