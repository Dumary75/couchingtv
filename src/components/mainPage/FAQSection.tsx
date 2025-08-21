
import FAQItem from './FAQItem';


export default function FAQSection() {
  return (
    <div className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        <FAQItem question="What can i watch on CouchingTV?">
          <p>
            You can watch YouTube Videos on CouchingTV, choose your favorite channels, and create personalized playlists.
            Enjoy a wide range of content from entertainment to education, all in one place.
          </p>
        </FAQItem>

        <FAQItem question="How much does CouchingTV cost?">
          <p>
            CouchingTV is completely free! Enjoy all features without any subscription fees or hidden costs.
          </p>
        </FAQItem>

        <FAQItem question="Where can i watch?">
          <p>
            You can watch CouchingTV on any device with internet access. Whether you're on your computer, tablet, or smartphone,
            you can enjoy your favorite videos anytime, anywhere.
          </p>
        </FAQItem>

        <FAQItem question="How do i cancel my subscription?">
          <p>
            CouchingTV does not require a subscription, so there is no cancellation needed. You can use the service as long as you like,
            and stop using it whenever you choose.
          </p>
        </FAQItem>
      </div>
    </div>
  );
}