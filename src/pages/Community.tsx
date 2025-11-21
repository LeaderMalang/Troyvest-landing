import { PageLayout } from "../components/PageLayout";

export default function Community() {
  return (
    <PageLayout title="Community">
      <p>
        The Troyvest community is the backbone of our decentralized governance ecosystem.
      </p>

      <h2 className="text-xl font-semibold text-white mt-6">Our Values</h2>
      <p>
        Transparency, accountability, fairness, and security. These principles guide
        how we build and scale the ecosystem.
      </p>

      <h2 className="text-xl font-semibold text-white mt-6">Join the Movement</h2>
      <p>
        Telegram: <a className="text-yellow-500" href="https://t.me/troyvest" target="_blank">t.me/troyvest</a>
      </p>
      <p>
        Discord: <a className="text-yellow-500" href="#" target="_blank">Coming Soon</a>
      </p>
    </PageLayout>
  );
}
