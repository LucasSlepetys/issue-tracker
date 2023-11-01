import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Callout } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';

const ErrorCallout = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <Callout.Root size={'1'} color='red' className='my-4'>
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>{children}</Callout.Text>
    </Callout.Root>
  );
};

export default ErrorCallout;
