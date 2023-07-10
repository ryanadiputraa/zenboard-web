import { UserInfo } from "@/data/user"

export const userReducer = (state: UserState, action: UserActions) => {
  switch (action.type) {
    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: {
          ...action.payload,
        },
      }

    default:
      return state
  }
}

export interface UserState {
  userInfo: {
    id: string
    first_name: string
    last_name: string
    email: string
    picture: string
    locale: string
    created_at: string
    verified_email: boolean
  }
}

export type UserActions = { type: "SET_USER_INFO"; payload: UserInfo }
