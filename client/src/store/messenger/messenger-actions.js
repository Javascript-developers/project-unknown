import axios from "axios";
import { messengerActions } from "./messenger-slice";

export const fetchMyConversations = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await axios.get(`/api/v1/conversation/`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });

      return res.data.data.conversation;
    };

    try {
      const conversations = await fetchData();
      dispatch(messengerActions.addConversations(conversations));
    } catch (error) {
      console.log(error);
    }
  };
};

//------------------------------------------------------------------------

export const fetchConversationMessages = (convId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await axios.get(`/api/v1/message/${convId}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });

      return res.data.data.messages;
    };

    try {
      const conversation = await fetchData();
      dispatch(messengerActions.addMessages(conversation));
    } catch (error) {
      console.log(error);
    }
  };
};

//-----------------------------------------------------------------------

export const fetchConversationUser = (userId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await axios.get(`/api/v1/users/${userId}`);

      return res.data.data.user;
    };

    try {
      const user = await fetchData();
      dispatch(messengerActions.addConvUser(user));
    } catch (error) {
      console.log(error);
    }
  };
};

//-----------------------------------------------------------------------

export const sendNewChatMessage = (messageForm) => {
  return async (dispatch) => {
    const sendData = async () => {
      const res = await axios.post(`/api/v1/message/`, messageForm, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });

      return res.data.data.newMessage;
    };

    try {
      const newMessage = await sendData();
      dispatch(messengerActions.addNewMessage(newMessage));
    } catch (error) {
      console.log(error);
    }
  };
};
