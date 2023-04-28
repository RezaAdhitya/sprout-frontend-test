const initialState = {
  isLoading: true,
  data: [],
  error: "",
};

export const mainReducers = (state = initialState, action) => {
  switch (action.type) {
    case "pokemon/fetchPending":
      return {
        ...initialState,
      };
    case "pokemon/fetchSuccess":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case "pokemon/fetchReject":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const fetchPending = () => ({
  type: "pokemon/fetchPending",
});

export const fetchSuccess = (responseJson) => ({
  type: "pokemon/fetchSuccess",
  payload: responseJson,
});

export const fetchReject = (error) => ({
  type: "pokemon/fetchReject",
  payload: error,
});

//THUNK
export const doFetchData = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchPending());
      let res = await fetch(
        'https://pokeapi.co/api/v2/pokemon'
      );
      if (!res.ok) {
        throw await res.text();
      }

      let resJson = await res.json();

      let pokemonData = await Promise.all(
        resJson.results.map(async (el, i) => {
          let detailRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${Number(i) + 1}`)
          let detailJson = await detailRes.json()
          el.id = detailJson.id
          el.types = detailJson.types
          el.image = detailJson.sprites.other['official-artwork'].front_default
          el.species = detailJson.species
          el.height = detailJson.height
          el.weight = detailJson.weight
          el.moves = detailJson.moves
          el.abilities = detailJson.abilities
          el.stats = detailJson.stats
          return el
        })
      )
      dispatch(fetchSuccess(pokemonData));
    } catch (err) {
      dispatch(fetchReject(err));
      throw err;
    }
  };
};
