import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ActuatorControlView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Actuator - ${CONFIG.appName}`}</title>
      </Helmet>

      <ActuatorControlView />
    </>
  );
}
