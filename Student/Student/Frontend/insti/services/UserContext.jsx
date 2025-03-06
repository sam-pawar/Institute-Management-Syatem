import { createContext, useContext, useReducer } from "react";

const userContext = createContext();

// Initial state of the user context
const initialState = {
    stdId : null,
    stdName: "",
    email: "",
    password: "",
    courseId: null,
    address: "",
    birthDate: "",
    photoImageName: "",
};

// Reducer to manage state transitions
function reducer(state, action) {
    switch (action.type) {
        case "student/login":
            console.log(action.payload);
            return {
                ...state,
                stdId: action.payload.stdId,
                stdName: action.payload.stdName,
                email: action.payload.email,
                password: action.payload.password,
                courseId: action.payload.courseId,
                address: action.payload.address,
                birthDate: action.payload.birthDate,
                photoImageName: action.payload.photoImageName,
            };
        case "student/register":
            return {
                ...state,
                stdId: action.payload.stdId,
                stdName: action.payload.stdName,
                email: action.payload.email,
                password: action.payload.password,
                courseId: action.payload.courseId,
                address: action.payload.address,
                birthDate: action.payload.birthDate,
                photoImageName: action.payload.photoImageName,
            };

        case "student/update":
            return {
                ...state,
                stdId: action.payload.stdId,
                stdName: action.payload.stdName,
                email: action.payload.email,
                password: action.payload.password,
                courseId: action.payload.courseId,
                address: action.payload.address,
                birthDate: action.payload.birthDate,
                photoImageName: action.payload.photoImageName,
            };

        case "student/logout": // New case for logout
            return initialState; // Reset state to initial state on logout

        default:
            return state;
    }
}

function UserProvider(props) {
    const [{ stdId, stdName, email, password, courseId, address, birthDate, photoImageName }, dispatch] = useReducer(
        reducer,
        initialState
    );

    // Logout function to reset the user state
    const logout = () => {
        dispatch({ type: "student/logout" });
    };

    return (
        <userContext.Provider value={{ stdId, stdName, email, password, courseId, address, birthDate, photoImageName, dispatch, logout }}>
            {props.children}
        </userContext.Provider>
    );
}

function useUser() {
    const context = useContext(userContext);
    return context;
}

export { UserProvider, useUser };
