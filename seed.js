require('dotenv').config();
require('./config/database');

const Battlestation = require('./models/battlestation');
const User = require('./models/user');


(async function() {

    // first user created will be returned
    const user = await User.findOne({})
    console.log(user)

    await Battlestation.deleteMany({})
    const battlestations = await Battlestation.create([
      {
        redditLink: "https://www.reddit.com/r/battlestations/comments/10f72s2/my_loved_ones_new_desk_shelf_to_match_north/",
        imageURL: "https://i.redd.it/v8k713z1wsca1.jpg",
        user: user,
    },
    {
        redditLink: "https://www.reddit.com/r/battlestations/comments/10dym3b/it_took_me_two_years_to_put_this_all_together_so//",
        imageURL: "https://i.redd.it/y3vqz9svpjca1.jpg",
        user: user,
    },
    {
        redditLink: "https://www.reddit.com/r/battlestations/comments/10m84uw/now_i_can_lose_in_4k/",
        imageURL: "https://i.redd.it/fpn6j2dd2jea1.jpg",
        user: user,
    },
    {
        redditLink: "https://www.reddit.com/r/battlestations/comments/10pwmys/my_first_pc/",
        imageURL: "https://i.redd.it/a76sk7mmnefa1.jpg",
        user: user,
    },
    {
        redditLink: "https://www.reddit.com/r/battlestations/comments/sxan9z/meet_my_actual_setup/",
        imageURL: "https://i.redd.it/9so2uih9t1j81.jpg",
        user: user,
    },
    {
        redditLink: "https://www.reddit.com/r/battlestations/comments/vldeih/my_desk_setup_2022/",
        imageURL: "https://i.redd.it/7eusj696x0891.jpg",
        user: user,
    },
    {
        redditLink: "https://www.reddit.com/r/battlestations/comments/10v8jjw/plants_added_uprages_halted_until_i_can_afford_a/",
        imageURL: "https://i.redd.it/0xg2xl0aimga1.jpg",
        user: user,
    },
    {
        redditLink: "https://www.reddit.com/r/battlestations/comments/10w49zd/i_think_im_done_with_it/",
        imageURL: "https://i.redd.it/tck7bojyqtga1.jpg",
        user: user,
    },
    {
        redditLink: "https://www.reddit.com/r/battlestations/comments/10solah/skylight_setup/",
        imageURL: "https://i.redd.it/ogr52pi8l1ga1.jpg",
        user: user,
    },
    {
        redditLink: "https://www.reddit.com/r/battlestations/comments/10vapjn/my_white_and_pink_for_now_pc_gaming_setup_this/",
        imageURL: "https://i.redd.it/cv2sti4vxmga1.jpg",
        user: user,
    },
    {
        redditLink: "https://www.reddit.com/r/battlestations/comments/10ruzpm/my_corner/",
        imageURL: "https://i.redd.it/3vg1rivz4tfa1.jpg",
        user: user,
    },
    ]);

    console.log(battlestations)
  
    process.exit()
  
  })()