import { createSlice } from "@reduxjs/toolkit";

const messengerSlice = createSlice({
  name: "messenger",
  initialState: {
    conversations: [],
    currentChat: null,
    messages: null,
    convUser: null,
  },
  reducers: {
    addConversations(state, action) {
      state.conversations = action.payload;
    },

    addCurrentChat(state, action) {
      state.currentChat = action.payload;
    },

    addMessages(state, action) {
      state.messages = action.payload;
    },

    addNewMessage(state, action) {
      state.messages.push(action.payload);
    },

    addConvUser(state, action) {
      state.convUser = action.payload;
    },
  },
});

export const messengerActions = messengerSlice.actions;
export default messengerSlice.reducer;
