const leetcodeQuery = `
  query LiveProfile($username: String!, $year: Int) {
    matchedUser(username: $username) {
      username
      submitStats { acSubmissionNum { difficulty count submissions } }
      profile { ranking userAvatar }
      userCalendar(year: $year) { totalActiveDays streak submissionCalendar }
    }
    userContestRanking(username: $username) { rating globalRanking topPercentage }
  }
`;

exports.handler = async function handler(event) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers: { Allow: 'GET' }, body: 'Method Not Allowed' };
  }

  const params = new URLSearchParams(event.rawQuery || '');
  const username = params.get('username') || 'Nikhil7635';
  const year = Number(params.get('year')) || new Date().getFullYear();

  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ query: leetcodeQuery, variables: { username, year } })
    });
    const payload = await response.json();

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0'
      },
      body: JSON.stringify(payload)
    };
  } catch (error) {
    console.error('LeetCode proxy request failed.', error);
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify({ error: 'Unable to fetch LeetCode profile data.' })
    };
  }
};
