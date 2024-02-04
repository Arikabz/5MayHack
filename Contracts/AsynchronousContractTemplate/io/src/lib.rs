#![no_std]

use gstd::{ prelude::*, ActorId };
use gmeta::{In,Out,InOut,Metadata};


// 1. Create your own Actions
#[derive(Encode, Decode, TypeInfo,  Clone)]
pub enum Action {
    
    // Add Actions
    Overtaking(String), // Example an action with a simple input
    Pay(u128), // Example an action with a u128 input
    Match_pay(u128)
    
}

// 2. Create your own Events
#[derive(Encode, Decode, TypeInfo, Hash, PartialEq, PartialOrd, Eq, Ord, Clone, Copy, Debug)]
pub enum  Event {
    
    // Add Events(Example)
    TimeoutEscrow,
    Pay,
    Finish,
    Overtake,
    Win,
    Loss
}


// 3. Create your own Struct
#[derive(Default, Clone, Encode, Decode, TypeInfo)]
pub struct Leaderboard {
   pub name_field: String,
   pub id_field: ActorId,
   pub points_field: u128
}

// 4. Create your init Struct
#[derive(Decode, Encode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct InitStruct {
   
    // Example:
    pub ft_program_id: ActorId,
}


pub struct ContractMetadata;

// 5. Define the structure of actions, events and state for your metadata.
impl Metadata for ContractMetadata{
     type Init = In<InitStruct>;
     type Surpass = InOut<Action,Event>;
     type Top = ();
     type State = Out<IoCustomStruct>;

}
