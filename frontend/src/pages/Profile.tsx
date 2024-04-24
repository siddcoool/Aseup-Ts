
import { Avatar, Breadcrumb, Button, Input, useToast } from "@chakra-ui/react";
// import useUser from "@/hooks/useUser";

const Profile = () => {
//   const user = useUser();
//   const toast = useToast();

//   const handleVerifyEmail = async () => {
//     try {
//       await Api.resendEmail();
//       toast({
//         title: "Verification email sent",
//         status: "success",
//         isClosable: true,
//         duration: 3000,
//       });
//     } catch (error) {
//       toast({
//         title: "failed to send verification email",
//         status: "error",
//         isClosable: true,
//         duration: 3000,
//       });
//     }
//   };

  return (
      <div className="mx-auto px-16 ">
        <div className="text-2xl">Settings</div>

        <div className="rounded-xl border border-stroke  flex flex-col items-center gap-y-8   bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
          <div className="border-b border-stroke flex justify-center  dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white py-4 ">
              Personal Information
            </h3>
          </div>
          {/* <div className=" rounded-full flex justify-center">
            <Avatar size="lg" src={user?.me.picture} name={user?.me.name} />
          </div> */}
          <div className="p-7">
            <form action="#">
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full ">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="fullName"
                  >
                    Name
                  </label>
                  {/* <div className="flex justify-between">
                    <Input disabled value={user?.me.name} />
                  </div> */}
                </div>
              </div>

              <div className="mb-5.5">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="emailAddress"
                >
                  Email Address
                </label>
                {/* <div className="">
                  <Input disabled value={user?.me.email} />
                </div> */}
              </div>
              {/* <WithCondition condition={!user?.me.isEmailVerified}>
                <div>
                  <Button onClick={handleVerifyEmail}>Verify Email</Button>
                </div>
              </WithCondition> */}

              {/* <div className="flex justify-end gap-4.5">
                <button
                  className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                  type="submit"
                >
                  Cancel
                </button>
                <button
                  className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                >
                  Save
                </button>
              </div> */}
            </form>
          </div>
        </div>
      </div>
  );
};

export default Profile;
