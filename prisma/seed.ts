import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // // Seed Users
  // await prisma.user.createMany({
  //   data: [
  //     {
  //       id: "a2f4ee21-2099-44f6-8dcf-3f6ca95b67ac",
  //       username: "Test Admin",
  //       email: "admin@test.com",
  //       password:
  //         "$2a$10$g8u5JxGqzVehDc7EUWWIMOXbeJleTYzJj05CNbhmRYe90oPtGjqPe",
  //       isAdmin: true,
  //       image:
  //         "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     },
  //     {
  //       id: "4393bb4f-3f1c-4f93-bcc1-b1ea70bca229",
  //       username: "Test User",
  //       email: "user@test.com",
  //       password:
  //         "$2a$10$g8u5JxGqzVehDc7EUWWIMOXbeJleTYzJj05CNbhmRYe90oPtGjqPe",
  //       isAdmin: false,
  //       image:
  //         "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     },
  //     {
  //       id: "297b902e-b3fa-42ee-bd0e-020dd09cf352",
  //       username: "Fake User 1",
  //       email: "fakeUser1@test.com",
  //       password:
  //         "$2a$10$g8u5JxGqzVehDc7EUWWIMOXbeJleTYzJj05CNbhmRYe90oPtGjqPe",
  //       isAdmin: false,
  //       image:
  //         "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     },
  //     {
  //       id: "3d53ea04-2df6-41c7-bfdc-3b8330215f4d",
  //       username: "Fake User 2",
  //       email: "fakeUser2@test.com",
  //       password:
  //         "$2a$10$g8u5JxGqzVehDc7EUWWIMOXbeJleTYzJj05CNbhmRYe90oPtGjqPe",
  //       isAdmin: false,
  //       image:
  //         "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     },
  //     {
  //       id: "19694096-0179-4835-9bd2-98dd6546d4aa",
  //       username: "Fake Admin 1",
  //       email: "fakeAdmin1@test.com",
  //       password:
  //         "$2a$10$g8u5JxGqzVehDc7EUWWIMOXbeJleTYzJj05CNbhmRYe90oPtGjqPe",
  //       isAdmin: true,
  //       image:
  //         "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     },
  //     {
  //       id: "68e3f266-d2dc-480f-abea-73ffcb56742d",
  //       username: "Fake Admin 2",
  //       email: "fakeAdmin2@test.com",
  //       password:
  //         "$2a$10$g8u5JxGqzVehDc7EUWWIMOXbeJleTYzJj05CNbhmRYe90oPtGjqPe",
  //       isAdmin: true,
  //       image:
  //         "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     },
  //   ],
  // });

  // // Seed Posts
  // await prisma.post.createMany({
  //   data: [
  //     {
  //       id: 1,
  //       title: "Living Beyond Cancer",
  //       description: `
  //     <p><em><mark>A journey of hope and healing, </mark></em></p>
  //     <h4><strong>Steps to Thrive</strong></h4>
  //     <ul class="list-disc ml-3">
  //       <li><p>Maintaining a positive mindset.</p></li>
  //       <li><p>Eating a balanced diet.</p></li>
  //       <li><p>Regular medical check-ups.</p></li>
  //     </ul>
  //     <p>Surviving cancer is a milestone, but thriving beyond it is the real victory...</p>
  //     <div data-youtube-video="">
  //       <iframe width="640" height="480" allowfullscreen="true" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"></iframe>
  //     </div>
  //     <blockquote><p><em><u>Author: Survivor’s Blog</u></em></p></blockquote>
  //   `,
  //       image:
  //         "https://images.unsplash.com/photo-1573497019732-7f1023b65b67?q=80&w=2071&auto=format&fit=crop",
  //       userId: "a2f4ee21-2099-44f6-8dcf-3f6ca95b67ac",
  //       status: "DRAFT",
  //     },
  //     {
  //       id: 2,
  //       title: "Preventing Cancer: Lifestyle Tips",
  //       description: `
  //     <p><em><mark>Small changes, big impact, </mark></em></p>
  //     <h4><strong>Protect Your Health</strong></h4>
  //     <ul class="list-disc ml-3">
  //       <li><p>Quit smoking and limit alcohol.</p></li>
  //       <li><p>Stay physically active.</p></li>
  //       <li><p>Get regular screenings.</p></li>
  //     </ul>
  //     <p>Prevention is better than cure. Learn about the lifestyle changes...</p>
  //     <div data-youtube-video="">
  //       <iframe width="640" height="480" allowfullscreen="true" src="https://www.youtube-nocookie.com/embed/eVTXPUF4Oz4"></iframe>
  //     </div>
  //     <blockquote><p><em><u>Author: Health Matters</u></em></p></blockquote>
  //   `,
  //       image:
  //         "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=2071&auto=format&fit=crop",
  //       userId: "a2f4ee21-2099-44f6-8dcf-3f6ca95b67ac",
  //       status: "PUBLISHED",
  //     },
  //     {
  //       id: 3,
  //       title: "Breaking Myths About Cancer",
  //       description: `
  //     <p><em><mark>Debunking common misconceptions about cancer, </mark></em></p>
  //     <h4><strong>Facts Everyone Should Know</strong></h4>
  //     <ul class="list-disc ml-3">
  //       <li><p>Cancer is not a death sentence.</p></li>
  //       <li><p>Lifestyle changes can lower risk.</p></li>
  //       <li><p>Early detection saves lives.</p></li>
  //     </ul>
  //     <p>There are many misconceptions about cancer that can cause unnecessary fear or stigma...</p>
  //     <div data-youtube-video="">
  //       <iframe width="640" height="480" allowfullscreen="true" src="https://www.youtube-nocookie.com/embed/a3XfN7A_ufE"></iframe>
  //     </div>
  //     <blockquote><p><em><u>Author: Cancer Awareness Group</u></em></p></blockquote>
  //   `,
  //       image:
  //         "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2071&auto=format&fit=crop",
  //       userId: "a2f4ee21-2099-44f6-8dcf-3f6ca95b67ac",
  //       status: "PUBLISHED",
  //     },
  //     {
  //       id: 4,
  //       title: "Caregiving for Cancer Patients",
  //       description: `
  //     <p><em><mark>Support tips for caregivers, </mark></em></p>
  //     <h4><strong>Becoming a Pillar of Strength</strong></h4>
  //     <ul class="list-disc ml-3">
  //       <li><p>Emotional support for patients.</p></li>
  //       <li><p>Managing treatments and appointments.</p></li>
  //       <li><p>Practicing self-care as a caregiver.</p></li>
  //     </ul>
  //     <p>Caregiving can be emotionally and physically challenging...</p>
  //     <div data-youtube-video="">
  //       <iframe width="640" height="480" allowfullscreen="true" src="https://www.youtube-nocookie.com/embed/b7YXkGcLZJo"></iframe>
  //     </div>
  //     <blockquote><p><em><u>Author: Caregiver Support Network</u></em></p></blockquote>
  //   `,
  //       image:
  //         "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2071&auto=format&fit=crop",
  //       userId: "a2f4ee21-2099-44f6-8dcf-3f6ca95b67ac",
  //       status: "HIDDEN",
  //     },
  //     {
  //       id: 5,
  //       title: "The Role of Exercise During Cancer Treatment",
  //       description: `
  //     <p><em><mark>How physical activity aids recovery, </mark></em></p>
  //     <h4><strong>Strength Through Movement</strong></h4>
  //     <ul class="list-disc ml-3">
  //       <li><p>Benefits of low-impact exercises.</p></li>
  //       <li><p>Managing fatigue through activity.</p></li>
  //       <li><p>Creating an exercise plan with your doctor.</p></li>
  //     </ul>
  //     <p>Staying active can improve mental and physical health during cancer treatment...</p>
  //     <div data-youtube-video="">
  //       <iframe width="640" height="480" allowfullscreen="true" src="https://www.youtube-nocookie.com/embed/5qap5aO4i9A"></iframe>
  //     </div>
  //     <blockquote><p><em><u>Author: Oncology Fitness Trainer</u></em></p></blockquote>
  //   `,
  //       image:
  //         "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=2071&auto=format&fit=crop",
  //       userId: "a2f4ee21-2099-44f6-8dcf-3f6ca95b67ac",
  //       status: "HIDDEN",
  //     },
  //     {
  //       id: 6,
  //       title: "Navigating Treatment Options: A Patient’s Guide",
  //       description: `
  //     <p><em><mark>Breaking down treatment plans, </mark></em></p>
  //     <h4><strong>Understanding What’s Right for You</strong></h4>
  //     <ul class="list-disc ml-3">
  //       <li><p>Surgery, chemotherapy, and radiation explained.</p></li>
  //       <li><p>How to prepare for consultations.</p></li>
  //       <li><p>Second opinions: When and why?</p></li>
  //     </ul>
  //     <p>Facing a cancer diagnosis can be overwhelming...</p>
  //     <div data-youtube-video="">
  //       <iframe width="640" height="480" allowfullscreen="true" src="https://www.youtube-nocookie.com/embed/OA3E0Oa4jVo"></iframe>
  //     </div>
  //     <blockquote><p><em><u>Author: Oncology Team</u></em></p></blockquote>
  //   `,
  //       image:
  //         "https://images.unsplash.com/photo-1484910292437-025e5d13ce87?q=80&w=2071&auto=format&fit=crop",
  //       userId: "a2f4ee21-2099-44f6-8dcf-3f6ca95b67ac",
  //       status: "DRAFT",
  //     },
  //   ],
  // });

  // // Seed Comments
  // await prisma.comment.createMany({
  //   data: [
  //     {
  //       id: 1,
  //       postId: 1,
  //       userId: "4393bb4f-3f1c-4f93-bcc1-b1ea70bca229",
  //       content: "First comment on post 1. Great insights!",
  //     },
  //     {
  //       id: 2,
  //       postId: 2,
  //       userId: "a2f4ee21-2099-44f6-8dcf-3f6ca95b67ac",
  //       content: "Very informative! Thanks for sharing.",
  //     },
  //     {
  //       id: 3,
  //       postId: 3,
  //       userId: "68e3f266-d2dc-480f-abea-73ffcb56742d",
  //       content: "This post really resonated with me.",
  //     },
  //     {
  //       id: 4,
  //       postId: 4,
  //       userId: "297b902e-b3fa-42ee-bd0e-020dd09cf352",
  //       content: "Thanks for clarifying this important topic.",
  //     },
  //     {
  //       id: 5,
  //       postId: 5,
  //       userId: "3d53ea04-2df6-41c7-bfdc-3b8330215f4d",
  //       content: "I have a question about this section...",
  //     },
  //     {
  //       id: 6,
  //       postId: 1,
  //       userId: "19694096-0179-4835-9bd2-98dd6546d4aa",
  //       content: "Really helpful post. Keep them coming!",
  //     },
  //     {
  //       id: 7,
  //       postId: 2,
  //       userId: "4393bb4f-3f1c-4f93-bcc1-b1ea70bca229",
  //       content: "The tips here are very practical. Thanks!",
  //     },
  //     {
  //       id: 8,
  //       postId: 3,
  //       userId: "68e3f266-d2dc-480f-abea-73ffcb56742d",
  //       content: "This is a well-written post. Great work!",
  //     },
  //     {
  //       id: 9,
  //       postId: 4,
  //       userId: "a2f4ee21-2099-44f6-8dcf-3f6ca95b67ac",
  //       content: "I learned something new from this post.",
  //     },
  //     {
  //       id: 10,
  //       postId: 5,
  //       userId: "3d53ea04-2df6-41c7-bfdc-3b8330215f4d",
  //       content: "I appreciate the effort put into this article.",
  //     },
  //     {
  //       id: 11,
  //       postId: 6,
  //       userId: "297b902e-b3fa-42ee-bd0e-020dd09cf352",
  //       content: "This content is much needed. Thanks!",
  //     },
  //     {
  //       id: 12,
  //       postId: 6,
  //       userId: "19694096-0179-4835-9bd2-98dd6546d4aa",
  //       content: "Great explanation! Easy to understand.",
  //     },
  //     {
  //       id: 13,
  //       postId: 1,
  //       userId: "4393bb4f-3f1c-4f93-bcc1-b1ea70bca229",
  //       content: "Can you provide more details about this?",
  //     },
  //     {
  //       id: 14,
  //       postId: 2,
  //       userId: "a2f4ee21-2099-44f6-8dcf-3f6ca95b67ac",
  //       content: "This really helped me understand the topic.",
  //     },
  //     {
  //       id: 15,
  //       postId: 3,
  //       userId: "68e3f266-d2dc-480f-abea-73ffcb56742d",
  //       content: "What a fantastic read! Very helpful.",
  //     },
  //     {
  //       id: 16,
  //       postId: 4,
  //       userId: "297b902e-b3fa-42ee-bd0e-020dd09cf352",
  //       content: "Thanks for putting this together. Very useful.",
  //     },
  //     {
  //       id: 17,
  //       postId: 5,
  //       userId: "19694096-0179-4835-9bd2-98dd6546d4aa",
  //       content: "I appreciate the practical advice here.",
  //     },
  //     {
  //       id: 18,
  //       postId: 6,
  //       userId: "3d53ea04-2df6-41c7-bfdc-3b8330215f4d",
  //       content: "This is one of the best posts I've read recently.",
  //     },
  //     {
  //       id: 19,
  //       postId: 1,
  //       userId: "4393bb4f-3f1c-4f93-bcc1-b1ea70bca229",
  //       content: "Looking forward to more posts like this!",
  //     },
  //     {
  //       id: 20,
  //       postId: 1,
  //       userId: "4393bb4f-3f1c-4f93-bcc1-b1ea70bca229",
  //       content: "This is a great post! Really enjoyed the insights.",
  //     },
  //     {
  //       id: 21,
  //       postId: 2,
  //       userId: "68e3f266-d2dc-480f-abea-73ffcb56742d",
  //       content:
  //         "I have a question about this point you made. Can you clarify?",
  //     },
  //     {
  //       id: 22,
  //       postId: 3,
  //       userId: "a2f4ee21-2099-44f6-8dcf-3f6ca95b67ac",
  //       content: "Very inspiring content. Thank you for sharing!",
  //     },
  //     {
  //       id: 23,
  //       postId: 2,
  //       userId: "3d53ea04-2df6-41c7-bfdc-3b8330215f4d",
  //       content: "I didn’t realize this before. Thanks for pointing it out!",
  //     },
  //     {
  //       id: 24,
  //       postId: 2,
  //       userId: "19694096-0179-4835-9bd2-98dd6546d4aa",
  //       content: "This really helped me understand a tough topic.",
  //     },
  //     {
  //       id: 25,
  //       postId: 2,
  //       userId: "297b902e-b3fa-42ee-bd0e-020dd09cf352",
  //       content: "Could you expand on this with more examples?",
  //     },
  //     {
  //       id: 26,
  //       postId: 3,
  //       userId: "4393bb4f-3f1c-4f93-bcc1-b1ea70bca229",
  //       content: "The examples here are spot on. Loved this post!",
  //     },
  //     {
  //       id: 27,
  //       postId: 3,
  //       userId: "68e3f266-d2dc-480f-abea-73ffcb56742d",
  //       content: "This has inspired me to look deeper into the subject.",
  //     },
  //     {
  //       id: 28,
  //       postId: 4,
  //       userId: "19694096-0179-4835-9bd2-98dd6546d4aa",
  //       content: "Very clear and concise. Great read!",
  //     },
  //     {
  //       id: 29,
  //       postId: 4,
  //       userId: "a2f4ee21-2099-44f6-8dcf-3f6ca95b67ac",
  //       content: "This makes so much sense now. Thanks for explaining!",
  //     },
  //     {
  //       id: 30,
  //       postId: 5,
  //       userId: "3d53ea04-2df6-41c7-bfdc-3b8330215f4d",
  //       content: "The details in this post are incredibly useful.",
  //     },
  //     {
  //       id: 31,
  //       postId: 5,
  //       userId: "297b902e-b3fa-42ee-bd0e-020dd09cf352",
  //       content: "I shared this with my team. They found it helpful too.",
  //     },
  //     {
  //       id: 32,
  //       postId: 3,
  //       userId: "19694096-0179-4835-9bd2-98dd6546d4aa",
  //       content: "This is exactly what I was looking for. Thanks!",
  //     },
  //     {
  //       id: 33,
  //       postId: 4,
  //       userId: "a2f4ee21-2099-44f6-8dcf-3f6ca95b67ac",
  //       content: "Excellent explanation. Helped me a lot.",
  //     },
  //     {
  //       id: 34,
  //       postId: 5,
  //       userId: "4393bb4f-3f1c-4f93-bcc1-b1ea70bca229",
  //       content: "Brilliant post! Please create more like this.",
  //     },
  //     {
  //       id: 35,
  //       postId: 5,
  //       userId: "68e3f266-d2dc-480f-abea-73ffcb56742d",
  //       content: "I’ve bookmarked this for future reference. So useful!",
  //     },
  //     {
  //       id: 36,
  //       postId: 6,
  //       userId: "297b902e-b3fa-42ee-bd0e-020dd09cf352",
  //       content: "Could you also share resources related to this topic?",
  //     },
  //     {
  //       id: 37,
  //       postId: 6,
  //       userId: "3d53ea04-2df6-41c7-bfdc-3b8330215f4d",
  //       content: "This gave me a new perspective on the topic.",
  //     },

  //     {
  //       id: 38,
  //       postId: 2,
  //       userId: "19694096-0179-4835-9bd2-98dd6546d4aa",
  //       content: "A well-detailed post. Appreciate your effort!",
  //     },
  //     {
  //       id: 39,
  //       postId: 4,
  //       userId: "a2f4ee21-2099-44f6-8dcf-3f6ca95b67ac",
  //       content:
  //         "I think this is one of the most comprehensive posts I’ve seen.",
  //     },
  //     {
  //       id: 40,
  //       postId: 4,
  //       userId: "68e3f266-d2dc-480f-abea-73ffcb56742d",
  //       content: "It’s posts like this that make learning enjoyable!",
  //     },
  //   ],
  // });

  // // Seed Likes
  // await prisma.like.createMany({
  //   data: [
  //     {
  //       id: 1,
  //       postId: 1,
  //       userId: "68e3f266-d2dc-480f-abea-73ffcb56742d",
  //     },
  //     {
  //       id: 2,
  //       postId: 1,
  //       userId: "4393bb4f-3f1c-4f93-bcc1-b1ea70bca229",
  //     },
  //     {
  //       id: 3,
  //       postId: 1,
  //       userId: "19694096-0179-4835-9bd2-98dd6546d4aa",
  //     },
  //     {
  //       id: 4,
  //       postId: 2,
  //       userId: "a2f4ee21-2099-44f6-8dcf-3f6ca95b67ac",
  //     },
  //     {
  //       id: 5,
  //       postId: 2,
  //       userId: "3d53ea04-2df6-41c7-bfdc-3b8330215f4d",
  //     },
  //     {
  //       id: 6,
  //       postId: 3,
  //       userId: "297b902e-b3fa-42ee-bd0e-020dd09cf352",
  //     },
  //     {
  //       id: 7,
  //       postId: 3,
  //       userId: "4393bb4f-3f1c-4f93-bcc1-b1ea70bca229",
  //     },
  //     {
  //       id: 8,
  //       postId: 4,
  //       userId: "19694096-0179-4835-9bd2-98dd6546d4aa",
  //     },
  //     {
  //       id: 9,
  //       postId: 5,
  //       userId: "68e3f266-d2dc-480f-abea-73ffcb56742d",
  //     },
  //     {
  //       id: 10,
  //       postId: 6,
  //       userId: "3d53ea04-2df6-41c7-bfdc-3b8330215f4d",
  //     },
  //     {
  //       id: 11,
  //       postId: 4,
  //       userId: "297b902e-b3fa-42ee-bd0e-020dd09cf352",
  //     },
  //     {
  //       id: 12,
  //       postId: 4,
  //       userId: "19694096-0179-4835-9bd2-98dd6546d4aa",
  //     },
  //     {
  //       id: 13,
  //       postId: 5,
  //       userId: "68e3f266-d2dc-480f-abea-73ffcb56742d",
  //     },
  //     {
  //       id: 14,
  //       postId: 5,
  //       userId: "3d53ea04-2df6-41c7-bfdc-3b8330215f4d",
  //     },
  //     {
  //       id: 15,
  //       postId: 5,
  //       userId: "19694096-0179-4835-9bd2-98dd6546d4aa",
  //     },
  //     {
  //       id: 16,
  //       postId: 2,
  //       userId: "297b902e-b3fa-42ee-bd0e-020dd09cf352",
  //     },
  //     {
  //       id: 17,
  //       postId: 6,
  //       userId: "a2f4ee21-2099-44f6-8dcf-3f6ca95b67ac",
  //     },
  //     {
  //       id: 18,
  //       postId: 6,
  //       userId: "4393bb4f-3f1c-4f93-bcc1-b1ea70bca229",
  //     },
  //     {
  //       id: 19,
  //       postId: 3,
  //       userId: "68e3f266-d2dc-480f-abea-73ffcb56742d",
  //     },
  //     {
  //       id: 20,
  //       postId: 3,
  //       userId: "19694096-0179-4835-9bd2-98dd6546d4aa",
  //     },
  //   ],
  // });

  // // Seed Saves
  // await prisma.save.createMany({
  //   data: [
  //     {
  //       id: 1,
  //       postId: 1,
  //       userId: "a2f4ee21-2099-44f6-8dcf-3f6ca95b67ac",
  //     },
  //     {
  //       id: 2,
  //       postId: 1,
  //       userId: "68e3f266-d2dc-480f-abea-73ffcb56742d",
  //     },
  //     {
  //       id: 3,
  //       postId: 1,
  //       userId: "19694096-0179-4835-9bd2-98dd6546d4aa",
  //     },
  //     {
  //       id: 4,
  //       postId: 2,
  //       userId: "4393bb4f-3f1c-4f93-bcc1-b1ea70bca229",
  //     },
  //     {
  //       id: 5,
  //       postId: 2,
  //       userId: "3d53ea04-2df6-41c7-bfdc-3b8330215f4d",
  //     },
  //     {
  //       id: 6,
  //       postId: 3,
  //       userId: "297b902e-b3fa-42ee-bd0e-020dd09cf352",
  //     },
  //     {
  //       id: 7,
  //       postId: 3,
  //       userId: "19694096-0179-4835-9bd2-98dd6546d4aa",
  //     },
  //     {
  //       id: 8,
  //       postId: 4,
  //       userId: "4393bb4f-3f1c-4f93-bcc1-b1ea70bca229",
  //     },
  //     {
  //       id: 9,
  //       postId: 4,
  //       userId: "a2f4ee21-2099-44f6-8dcf-3f6ca95b67ac",
  //     },
  //     {
  //       id: 10,
  //       postId: 6,
  //       userId: "19694096-0179-4835-9bd2-98dd6546d4aa",
  //     },
  //     {
  //       id: 11,
  //       postId: 6,
  //       userId: "3d53ea04-2df6-41c7-bfdc-3b8330215f4d",
  //     },
  //     {
  //       id: 12,
  //       postId: 6,
  //       userId: "68e3f266-d2dc-480f-abea-73ffcb56742d",
  //     },
  //     {
  //       id: 13,
  //       postId: 5,
  //       userId: "297b902e-b3fa-42ee-bd0e-020dd09cf352",
  //     },
  //     {
  //       id: 14,
  //       postId: 5,
  //       userId: "4393bb4f-3f1c-4f93-bcc1-b1ea70bca229",
  //     },
  //     {
  //       id: 15,
  //       postId: 5,
  //       userId: "3d53ea04-2df6-41c7-bfdc-3b8330215f4d",
  //     },
  //     {
  //       id: 16,
  //       postId: 5,
  //       userId: "19694096-0179-4835-9bd2-98dd6546d4aa",
  //     },
  //     {
  //       id: 17,
  //       postId: 4,
  //       userId: "68e3f266-d2dc-480f-abea-73ffcb56742d",
  //     },
  //     {
  //       id: 18,
  //       postId: 4,
  //       userId: "a2f4ee21-2099-44f6-8dcf-3f6ca95b67ac",
  //     },
  //     {
  //       id: 19,
  //       postId: 4,
  //       userId: "4393bb4f-3f1c-4f93-bcc1-b1ea70bca229",
  //     },
  //     {
  //       id: 20,
  //       postId: 3,
  //       userId: "19694096-0179-4835-9bd2-98dd6546d4aa",
  //     },
  //     {
  //       id: 21,
  //       postId: 5,
  //       userId: "68e3f266-d2dc-480f-abea-73ffcb56742d",
  //     },
  //     {
  //       id: 22,
  //       postId: 5,
  //       userId: "297b902e-b3fa-42ee-bd0e-020dd09cf352",
  //     },
  //     {
  //       id: 23,
  //       postId: 6,
  //       userId: "4393bb4f-3f1c-4f93-bcc1-b1ea70bca229",
  //     },
  //   ],
  // });

  // // Seed Event Organizers
  // await prisma.eventOrganizer.createMany({
  //   data: [
  //     {
  //       id: "f8100d4e-af82-4c19-8cde-5a586caeea76",
  //       contact: "contact@hopefoundation.org",
  //       name: "Hope Foundation",
  //       website: "https://hopefoundation.org",
  //     },
  //     {
  //       id: "b8d24713-5037-493a-9d2e-9aebd5c6b51e",
  //       contact: "contact@cancerpatientsupport.org",
  //       name: "Cancer Patient Support",
  //       website: "https://cancerpatientsupport.org",
  //     },
  //   ],
  // });

  // // Seed Events
  // await prisma.event.createMany({
  //   data: [
  //     {
  //       id: 1,
  //       title: "Cancer Awareness Webinar",
  //       description:
  //         "Join us for an insightful session on early detection and prevention of cancer. Learn from top oncologists and cancer survivors who share their inspiring stories and practical tips. This event aims to provide resources and empower individuals to lead healthier lives.",
  //       status: "UP_COMING",
  //       startDate: "2024-12-20T15:00:00.000Z",
  //       endDate: "2024-12-20T17:00:00.000Z",
  //       createdAt: "2024-12-01T12:30:00.000Z",
  //       updatedAt: "2024-12-01T12:30:00.000Z",
  //       locationType: "ONLINE",
  //       venue: null,
  //       address: null,
  //       mapLink: null,
  //       onlineLink:
  //         "zoommtg://zoom.us/join?confno=1234567890&pwd=abcd1234&uname=CancerAwareness",
  //       bannerImage:
  //         "https://images.unsplash.com/photo-1498503186772-1d56fa47b9f3?q=80&w=1932",
  //       gallery: [
  //         "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?q=80&w=1920",
  //         "https://images.unsplash.com/photo-1576705957776-df9a7d3e8f7c?q=80&w=1920",
  //       ],
  //       resources: [],
  //       // resources: [
  //       //   {
  //       //     id: 1,
  //       //     type: "document",
  //       //     title: "Webinar Agenda",
  //       //     url: "/files/webinar-agenda.pdf"
  //       //   },
  //       //   {
  //       //     id: 2,
  //       //     type: "link",
  //       //     title: "Official Website",
  //       //     url: "https://example.com"
  //       //   }
  //       // ],
  //       organizerId: "b8d24713-5037-493a-9d2e-9aebd5c6b51e",
  //       userId: "a2f4ee21-2099-44f6-8dcf-3f6ca95b67ac",
  //     },
  //     {
  //       id: 2,
  //       title: "Cancer Survivors Meetup",
  //       description:
  //         "A heartfelt gathering of cancer survivors sharing their journeys, challenges, and victories. This hybrid event aims to foster support, celebrate resilience, and inspire hope among the community.",
  //       status: "UP_COMING",
  //       startDate: "2025-01-15T10:00:00.000Z",
  //       endDate: "2025-01-15T14:00:00.000Z",
  //       createdAt: "2024-12-01T14:00:00.000Z",
  //       updatedAt: "2024-12-01T14:00:00.000Z",
  //       locationType: "HYBRID",
  //       venue: "Community Hall, City Center",
  //       address: "123 Wellness Street, Metropolis",
  //       mapLink: "https://www.google.com/maps?q=123+Wellness+Street+Metropolis",
  //       onlineLink:
  //         "zoommtg://zoom.us/join?confno=6543210987&pwd=xyz9876&uname=SurvivorsMeet",
  //       bannerImage:
  //         "https://images.unsplash.com/photo-1529180960132-12d1e5b5cf14?q=80&w=1932",
  //       gallery: [
  //         "https://images.unsplash.com/photo-1498600572403-841560b70365?q=80&w=1920",
  //         "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=1920",
  //       ],
  //       resources: [],
  //       // resources: [
  //       //   {
  //       //     id: 1,
  //       //     type: "document",
  //       //     title: "Meetup Schedule",
  //       //     url: "/files/meetup-schedule.pdf"
  //       //   },
  //       //   {
  //       //     id: 2,
  //       //     type: "link",
  //       //     title: "Registration Page",
  //       //     url: "https://example.com/register"
  //       //   }
  //       // ],
  //       organizerId: "f8100d4e-af82-4c19-8cde-5a586caeea76",
  //       userId: "a2f4ee21-2099-44f6-8dcf-3f6ca95b67ac",
  //     },
  //     {
  //       id: 3,
  //       title: "Cancer Research Updates",
  //       description:
  //         "Discover the latest advancements in cancer research from leading scientists and researchers. This onsite event will highlight cutting-edge treatments, breakthroughs, and the future of cancer care.",
  //       status: "FINISHED",
  //       startDate: "2024-11-15T09:00:00.000Z",
  //       endDate: "2024-11-15T17:00:00.000Z",
  //       createdAt: "2024-10-01T08:00:00.000Z",
  //       updatedAt: "2024-11-16T10:00:00.000Z",
  //       locationType: "ONSITE",
  //       venue: "International Convention Center",
  //       address: "456 Research Avenue, Capital City",
  //       mapLink:
  //         "https://www.google.com/maps?q=456+Research+Avenue+Capital+City",
  //       onlineLink: null,
  //       bannerImage:
  //         "https://images.unsplash.com/photo-1514328342898-4dbd69c9fd30?q=80&w=1932",
  //       gallery: [
  //         "https://images.unsplash.com/photo-1503457574464-2c485361dcda?q=80&w=1920",
  //         "https://images.unsplash.com/photo-1476958526483-36efcaa71fb1?q=80&w=1920",
  //       ],
  //       resources: [],
  //       // resources: [
  //       //   {
  //       //     id: 1,
  //       //     type: "document",
  //       //     title: "Research Highlights",
  //       //     url: "/files/research-highlights.pdf"
  //       //   },
  //       //   {
  //       //     id: 2,
  //       //     type: "link",
  //       //     title: "Scientific Journal",
  //       //     url: "https://example.com/journal"
  //       //   }
  //       // ],
  //       organizerId: "b8d24713-5037-493a-9d2e-9aebd5c6b51e",
  //       userId: "a2f4ee21-2099-44f6-8dcf-3f6ca95b67ac",
  //     },
  //     {
  //       id: 4,
  //       title: "Fundraiser Walk for Cancer Awareness",
  //       description:
  //         "Join the community in raising funds for cancer research and support programs. The walk will take place in a beautiful park with refreshments, live music, and activities for all ages.",
  //       status: "UP_COMING",
  //       startDate: "2025-02-10T08:00:00.000Z",
  //       endDate: "2025-02-10T12:00:00.000Z",
  //       createdAt: "2024-12-02T10:00:00.000Z",
  //       updatedAt: "2024-12-02T10:00:00.000Z",
  //       locationType: "ONSITE",
  //       venue: "Green Meadows Park",
  //       address: "789 Wellness Way, Springfield",
  //       mapLink: "https://www.google.com/maps?q=789+Wellness+Way+Springfield",
  //       onlineLink: null,
  //       bannerImage:
  //         "https://images.unsplash.com/photo-1487713889371-8e6e5b8d487f?q=80&w=1932",
  //       gallery: [
  //         "https://images.unsplash.com/photo-1515263487990-7a5c085913a9?q=80&w=1920",
  //         "https://images.unsplash.com/photo-1529260837833-79b7cccd5d1a?q=80&w=1920",
  //       ],
  //       resources: [],
  //       // resources: [
  //       //   {
  //       //     id: 1,
  //       //     type: "document",
  //       //     title: "Event Route Map",
  //       //     url: "/files/event-route-map.pdf"
  //       //   },
  //       //   {
  //       //     id: 2,
  //       //     type: "link",
  //       //     title: "Donation Page",
  //       //     url: "https://example.com/donate"
  //       //   }
  //       // ],
  //       organizerId: "f8100d4e-af82-4c19-8cde-5a586caeea76",
  //       userId: "a2f4ee21-2099-44f6-8dcf-3f6ca95b67ac",
  //     },
  //     {
  //       id: 5,
  //       title: "Healthy Living Seminar",
  //       description:
  //         "This seminar focuses on how a healthy lifestyle can help reduce the risk of cancer. Topics include balanced nutrition, physical activity, and mental well-being, presented by health experts.",
  //       status: "UP_COMING",
  //       startDate: "2025-03-05T10:00:00.000Z",
  //       endDate: "2025-03-05T13:00:00.000Z",
  //       createdAt: "2024-12-02T15:00:00.000Z",
  //       updatedAt: "2024-12-02T15:00:00.000Z",
  //       locationType: "ONLINE",
  //       venue: null,
  //       address: null,
  //       mapLink: null,
  //       onlineLink:
  //         "zoommtg://zoom.us/join?confno=4567891230&pwd=qwerty1234&uname=HealthyLiving",
  //       bannerImage:
  //         "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?q=80&w=1932",
  //       gallery: [
  //         "https://images.unsplash.com/photo-1558568751-14b0574817c5?q=80&w=1920",
  //         "https://images.unsplash.com/photo-1557825835-0ca2ce18055b?q=80&w=1920",
  //       ],
  //       resources: [],
  //       // resources: [
  //       //   {
  //       //     id: 1,
  //       //     type: "document",
  //       //     title: "Seminar Highlights",
  //       //     url: "/files/seminar-highlights.pdf"
  //       //   },
  //       //   {
  //       //     id: 2,
  //       //     type: "link",
  //       //     title: "Healthy Recipes",
  //       //     url: "https://example.com/recipes"
  //       //   }
  //       // ],
  //       organizerId: "b8d24713-5037-493a-9d2e-9aebd5c6b51e",
  //       userId: "a2f4ee21-2099-44f6-8dcf-3f6ca95b67ac",
  //     },
  //   ],
  // });

  // // Seed Settings
  // await prisma.settings.create({
  //   data: {
  //     id: 1,
  //     usersPerPage: 10,
  //     eventsPerPage: 9,
  //     articlesPerPage: 9,
  //     commentsPerPage: 12,
  //     postLengthLimit: 3000,
  //     eventLengthLimit: 1500,
  //   },
  // });

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
