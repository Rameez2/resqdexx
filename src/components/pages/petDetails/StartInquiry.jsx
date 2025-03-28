import { useNavigate } from "react-router-dom";
import { getUserById } from "../../../api/userApi";

const StartInquiry = ({petInfo}) => {

    const navigate = useNavigate();

  async function startInquiry(orgId) {
    try {
      console.log('NEW INQUIRY');
      console.log('org id,',orgId);
      
      const doc = await getUserById(orgId);
      
      // navigate('/profile', { state: { adopterInfo: doc } });
      navigate('/messages', { state: { adopterInfo: doc } });
    } catch (error) {
      console.error('Error starting inquiry:', error);
    }
  }

    return (
        <>
            <button className='primary-btn' onClick={() => startInquiry(petInfo.organization_id)}>
                Start Inquiry
            </button>
        </>
    );
}

export default StartInquiry;
