import { useApi, useAccount } from '@gear-js/react-hooks';
import { Routing } from 'pages';
import { Header, ApiLoader } from 'components';
import { withProviders } from 'hocs';
import 'App.css';

function Component() {
  const { isApiReady } = useApi();
  const { isAccountReady } = useAccount();

  const isAppReady = isApiReady && isAccountReady;
    console.log(isAccountReady)

  return (
    <>
      <Header isAccountVisible={isAccountReady} />
      <main>{isAppReady ? <Routing /> : <ApiLoader />}</main>
      
    </>
  );
}

export const App = withProviders(Component);
