# My Approach

The task for this project was to redesign this page: https://wewantwaste.co.uk/, ensuring  responsiveness and improvement. Here's how I approached the solution:

On initial load, I fetch skip options from the API:
https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft. Each skip object is transformed to include computed values for VAT amount and total price including VAT, formatted for clarity.

I then addressed loading and empty state management by displaying full-page messages to keep users informed. If the data fails to load, the user is given the option to "Try Again" to reattempt fetching the data.

I then developed the booking progress section as a reusable, hardcoded component specifically for this code challenge. To enhance the user experience, I decided to position this component statically at the top of the page.

Next, I focused on the main view by implementing a header section that clearly instructs the user on what action is required. Following that, I designed the interactive card view to display the skip data. Each card presents the VAT-inclusive price, size description, and key features from the data payload (road placement availability and heavy waste support).

Upon selecting a skip, a confirmation modal appears, providing users with a summary of their choice. This includes a detailed cost breakdown and any applicable transport costs—along with contextual warnings about placement restrictions and the type of waste permitted.

For visuals, I utilized lucide-react to clearly represent icons, actions, and warnings.

I chose Tailwind CSS to enable rapid styling and create responsive layouts efficiently.

A footer was added to improve the page structure.

Code Sandbox link: https://zrt44n-5173.csb.app/

# Technologies Used

- React (Vite)
- Tailwind CSS
- Lucide React (icons)
- Fetch API (for remote data)
