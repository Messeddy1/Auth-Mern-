import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

function Spinnerloading() {
  return (
    <Button variant="primary" disabled className="mt-3">
    <Spinner
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    Loading...
  </Button>
  );
}

export default Spinnerloading;