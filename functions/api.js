const https = require('https')

exports.handler = function(_, _, callback) {
  https.get('https://api.meetup.com/LancasterLaravel/events?page=1', (res) => {
    let body = ''

    res.on('data', (chunk) => {
      body += chunk
    })

    res.on('end', () => {
      const json = JSON.parse(body)
      const event = json[0]

      const diffInMinutes = (new Date(event.time) - new Date()) / 1000 / 60

      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          name: "Lancaster Laravel",
          urls: {
            website: "https://lancasterlaravel.com/",
            meetup: "https://www.meetup.com/lancasterlaravel/",
          },
          next_meetup: {
            name: event.name,
            description: event.description,
            time: event.time,
            link: diffInMinutes > 15 ? null : event.how_to_find_us,
          },
        }),
      })
    })
  })
}
