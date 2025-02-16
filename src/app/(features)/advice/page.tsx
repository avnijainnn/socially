import { getAdvices } from "@/actions/advice.action";
import { getDbUserId } from "@/actions/user.action";
import CreateAdvice from "@/components/CreateAdvice";
import AdviceCard from "@/components/AdviceCard"; // Replace PostCard with AdviceCard
//import WhoToFollow from "@/components/WhoToFollow";
import { currentUser } from "@clerk/nextjs/server";
//import SearchForm from "@/components/SearchForm";

export default async function Home() {
  const user = await currentUser();
  const advices = await getAdvices(); // Fetch advices instead of posts
  const dbUserId = await getDbUserId();

  return (
    
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        {/* <SearchForm />  */}
        {user ? <CreateAdvice /> : null} {/* Replace CreatePost with CreateAdvice */}

        <div className="space-y-6">
          {advices.map((advice) => (
            <AdviceCard key={advice.id} advice={advice} dbUserId={dbUserId ?? ''} /> // Replace PostCard with AdviceCard
          ))}
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-4 sticky top-20">
       {/* // <WhoToFollow /> */}
      </div>
    </div>
  );
}