import re

with open('src/components/AcademySection.tsx', 'r') as f:
    content = f.read()

# Change price state
content = content.replace('const [newCoursePrice, setNewCoursePrice] = useState("1500");', 'const [newCoursePrice, setNewCoursePrice] = useState("0");')
content = content.replace('setNewCoursePrice("1500");', 'setNewCoursePrice("0");')

# Change alert
content = content.replace('alert(`🎉 monetized Course Created successfully!\\n\\nYour course "${newCourseTitle}" has been added to the public catalog for $${priceNum.toLocaleString()}.\\n\\nYou received a $5,000 launch booster incentive!`);', 'alert(`🎉 Course Created successfully!\\n\\nYour course "${newCourseTitle}" has been added to the public catalog for free.`);')

# The wallet stats
content = content.replace('+$312,000', '')
content = content.replace('+$842,500', '')
content = content.replace('INSTRUCTOR EARNINGS', 'INSTRUCTOR CONTRIBUTIONS')
content = content.replace('$312,000', '1,245 Students')
content = content.replace('LEARNER WALLET', 'COMPLETED CERTIFICATIONS')
content = content.replace('$842,500', '3 Certificates')
content = content.replace('Prove your skills and have professional-worthy certifications on your ESTARR profile.', 'Prove your skills and earn professional-worthy certifications on your ESTARR profile for free.')

with open('src/components/AcademySection.tsx', 'w') as f:
    f.write(content)
