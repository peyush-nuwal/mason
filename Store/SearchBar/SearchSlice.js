import { createSlice } from "@reduxjs/toolkit";
import shoe from "../../src/assets/shoe"
import accessories from "../../src/assets/accessories"
const initialState = {
    query: '',
    results: [],
    isSearchBarVisible: false,
    products:shoe,
    accessories:accessories
  };

export const SearchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
         setQuery:(state,action)=>{
            const query = action.payload.toLowerCase()
            const productsResults = state.products.filter(product => product.name.toLowerCase().includes(query)).map(product => ({ ...product, uniqueId: `shoe-${product.id}` }));
           const accessoriesResults = state.accessories.filter(accessory => accessory.name.toLowerCase().includes(query)).map(accessory => ({ ...accessory, uniqueId: `accessory-${accessory.id}` }));
           state.query = action.payload;
           state.results = [...productsResults, ...accessoriesResults]
            
         },
         clearResults:(state)=>{
            state.results=[]
         },
       showSearchBar:(state)=>{
           state.isSearchBarVisible = true
       },
       hideSearchBar:(state)=>{
        state.isSearchBarVisible = false
    }
    },
});
export const { showSearchBar,hideSearchBar,setQuery,clearResults } = SearchSlice.actions;
export default SearchSlice.reducer;