export let data = {
authUser: null,
checkUser : [],
currentSelected: null,
dishes: [{}]
}

export function reducer(state,action) {

  switch(action.type) {
    case 'AUTH_USER': {
      return {
        ...state,
        authUser: action.payload
      }
    }
    case 'USER_CHECK': {
      return {
        ...state,
        checkUser: 'user exist'
      }
    }

    case 'USER_NOT_EXIST': {
      return {
        ...state,
        checkUser: 'user does not exist'
      }
    }

   case 'CURRENT_SELECTED': {
     return {
       ...state, 
       currentSelected: action.payload
     }
    }
    
  // case 'SAME_PAGES_DISHES' : {
  //   let dishesClone = state.dishes.slice(0);
  //   dishesClone.push(action.payload)
  //   console.log(dishesClone)
  //   return {
  //     ...state, 
  //     dishes: dishesClone
  //   }
  // }
  default: 
  return state;

}
}