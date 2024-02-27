import { createSlice } from "@reduxjs/toolkit";
const initialState={
    isLoggedIn:false,
    personName:"Guest",
    uname:'',
    usertype:''
}
const authslice = createSlice({
        name:'auth',
        initialState,
        reducers:{
            login(state,action)
            {
                state.isLoggedIn=true;
                state.personName=action.payload.name
                state.uname=action.payload.username
                state.usertype=action.payload.usertype
            },
            logout(state,action)
            {
                state.isLoggedIn=false
                state.personName="Guest"
                state.uname='';
                state.usertype='';
            }
        }
    }
)
export const {login,logout} = authslice.actions;
export default authslice.reducer;