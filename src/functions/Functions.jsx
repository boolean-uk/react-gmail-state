
import PropTypes from 'prop-types'

export function ToggleRead(props) {
    ToggleRead.propTypes = {
        email: PropTypes.object.isRequired,
        setEmails: PropTypes.func.isRequired,
        target: PropTypes.object.isRequired
    };
    
    const {emails, setEmails, target} = props

    // Mapping the emails -> create updatedEmails with updated status on the target:
    // Dont need a parameter here since Toggle read already have.
    const updatedEmails  = emails.map((email) => email.id === target.id ? {...email, read: !email.read} : email)
    
    // Update the emails state with the updated array
    setEmails(updatedEmails)
    console.log(emails);
 
}


export function ToggleStar(props) {
    ToggleStar.propTypes = {
        email: PropTypes.object.isRequired,
        setEmails: PropTypes.func.isRequired,
        target: PropTypes.object.isRequired
    };

    const {emails, setEmails, target} = props
    const updatedEmails = emails.map((email) => email.id === target.id ? {...email, starred: !email.starred} : email)
    
    // Update the emails state with the updated array
    setEmails(updatedEmails)
    console.log(emails);
    
  
}

//export default {ToggleRead, ToggleStar};

