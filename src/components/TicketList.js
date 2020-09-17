import React from "react";
import PropTypes from "prop-types";
import Ticket from "./Ticket";
// We need to import hooks functionality from both react-redux and react-redux-firebase.
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'

function TicketList(props){

  useFirestoreConnect([
    { collection: 'tickets' }
  ]);

  // useFirestoreConnect([  could do this to find tic w/specific id
  //   { collection: 'tickets',
  //     doc: ticketId }
  // ]);

  const tickets = useSelector(state=>state.firestore.ordered.tickets);
  // While useFirestoreConnect() is listening for changes to Firestore, we also need to take advantage of a React Redux hook called useSelector() which makes state available from our store. All Firestore data is still passing through our store through our firestoreReducer. We need to make it available with the useSelector() hook:

  if(isLoaded(tickets)){
  return (
    <React.Fragment>
      <hr/>
      {tickets.map((ticket) => {
        return <Ticket
          whenTicketClicked = { props.onTicketSelection }
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          formattedWaitTime={ticket.formattedWaitTime}
          id={ticket.id}
          key={ticket.id}/>
      })}
    </React.Fragment>
  );
    // If the tickets aren't loaded yet, our fragment will return a "Loading..." message.
  } else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    )
  }
}

TicketList.propTypes = {
  // ticketList: PropTypes.object,no longer need ticketList props
  onTicketSelection: PropTypes.func
};

export default TicketList;