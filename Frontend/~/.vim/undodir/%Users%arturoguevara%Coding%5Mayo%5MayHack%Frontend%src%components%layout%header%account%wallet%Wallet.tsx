Vim�UnDo� Oh�RhO�GPY��FD"��[~Bo���� �G�                                     e��    _�                            ����                                                                                                                                                                                                                                                                                                                                                             e��&     �               #    <div className={styles.wallet}>5��                         c                     5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             e��'     �                   <div className=>5��                         c                     5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             e��(     �                   <div className=''>5��                         d                     5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             e��O     �                   <div className='btn'>5��                         d                     5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             e��P     �               $      <p className={styles.balance}>5��                         z                     5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             e��Q    �                     <p className=>5��                         z                     5�_�                             ����                                                                                                                                                                                                                                                                                                                                                             e��     �                  /import { Account } from '@gear-js/react-hooks';   2import { AccountButton } from '../account-button';   *import styles from './Wallet.module.scss';       type Props = {     balance: Account['balance'];     address: string;     name: string | undefined;     onClick: () => void;   };       =function Wallet({ balance, address, name, onClick }: Props) {   
  return (       <div className=''>         <p className=''>   O        {balance.value} <span className={styles.currency}>{balance.unit}</span>   
      </p>   G      <AccountButton address={address} name={name} onClick={onClick} />   
    </div>     );   }       export { Wallet };5�5��