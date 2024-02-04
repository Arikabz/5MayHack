
#![no_std]
use gstd::{msg,async_main, collections::HashMap , prelude::*,ActorId};
use io::*;

#[cfg(feature = "binary-vendor")]
include!(concat!(env!("OUT_DIR"), "/wasm_binary.rs"));


// 1. Create the main state as a static variable.
static mut STATE:Option<String> = None;

// 1.1 Create the init state.
static mut INIT:Option<InitStruct> = None;



// 2. Create the mutability function for your state.
fn state_mut() -> &'static mut String {

    let state = unsafe {  STATE.as_mut()};

    unsafe { state.unwrap_unchecked() }

}

#[warn(dead_code)]
fn init_state_mut() -> &'static mut InitStruct {

    let initstruct = unsafe { INIT.as_mut()};

    unsafe { initstruct.unwrap_unchecked() }

}

// Create a public State
#[derive(Clone, Default)]
pub struct CustomStruct {
    pub poleposition: String,
    pub pointstobeat: u128
}

// Create a implementation on State
impl CustomStruct {
    #[allow(dead_code)]
    async fn firstmethod(&mut self) {}
    #[allow(dead_code)]
    async fn secondmethod(&mut self) { }
    #[allow(dead_code)]
    async fn thirdmethod(&mut self) {}
}


// 3. Create the init() function of your contract.
#[no_mangle]
extern "C" fn init () {

    let config: InitStruct = msg::load().expect("Unable to decode InitStruct");

    if config.ft_program_id.is_zero() {
        panic!("InitStruct program address can't be 0");
    }

    let init = InitStruct {
        ft_program_id: config.ft_program_id
    };

    

    unsafe {
        INIT = Some(init);
    }



    let state = CustomStruct {
        ..Default::default()
    };

    unsafe { STATE = Some(state) };


}


// 4.Create the main() function of your contract.
#[async_main]
async fn main(){

        // We load the input message
        let action: Action = msg::load().expect("Could not load Action");

        // We receive an action from the user and update the state. Example:
        match action {
            Action::Overtaking(input) => {

                // Create a variable with mutable state.
                let currentstate = state_mut();

                // Update your state.
                currentstate.poleposition = input.to_string();


                 // Generate your event.
                 let _ =msg::reply(Event::Overtake,0);


            }
            Action::Pay(input) => {
                
                transfer(ActorId, 0x51caa51ce1833d8f786136863645dbcff0c5c3b32fb404a4709e9a2c2c8afc29, input)

                 // Generate your event.
                let _ =  msg::reply(Event::Pay,0);
               

            }
            Action::Match_pay(input) => {
               
                transfer(ActorId, 0x51caa51ce1833d8f786136863645dbcff0c5c3b32fb404a4709e9a2c2c8afc29, 0x51caa51ce1833d8f786136863645dbcff0c5c3b32fb404a4709e9a2c2c8afc29.balance())

                // Generate your event.
                let _ = msg::reply(Event::Pay,0);
            }
           
        };
    }

        


// 5. Create the state() function of your contract.
#[no_mangle]
extern "C" fn state() {
   
    let state = unsafe { STATE.take().expect("Unexpected error in taking state") };

    msg::reply::<IoCustomStruct>(state.into(), 0)
    .expect("Failed to encode or reply with `<ContractMetadata as Metadata>::State` from `state()`");
    
}


// Implementation of the From trait for converting CustomStruct to IoCustomStruct
impl From<CustomStruct> for IoCustomStruct {

    // Conversion method
    fn from(value: CustomStruct) -> Self {
        // Destructure the CustomStruct object into its individual fields
        let CustomStruct {
            name_field,
            id_field,
            points_field,
        } = value;

        // Perform some transformation on points_field, cloning its elements
        let points_field = points_field.iter().map(|(k, v)| (*k, v.clone())).collect();
   
        // Create a new IoCustomStruct object using the destructured fields
        Self {
            name_field,
            id_field,
            points_field,
        }
    }
}
