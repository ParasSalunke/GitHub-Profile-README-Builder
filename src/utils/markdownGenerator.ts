import { ProfileData } from '../types.ts';
import { SKILL_MAP, SKILL_CATEGORIES } from './skillsData.ts';

export function generateMarkdown(profile: ProfileData): string {
  const lines: string[] = [];
  const align = profile.headerAlignment || 'left';
  const isCenter = align === 'center';
  const u = profile.githubStats.username.trim() || 'username';

  // 1. Header Banner
  if (profile.bannerUrl && profile.bannerUrl.trim()) {
    if (isCenter) {
      lines.push(`<div align="center">`);
      lines.push(`  <img src="${profile.bannerUrl.trim()}" alt="${profile.name} Banner" width="100%" />`);
      lines.push(`</div>\n`);
    } else {
      lines.push(`![Banner](${profile.bannerUrl.trim()})\n`);
    }
  }

  // 2. Avatar & Title Header
  if (isCenter) {
    lines.push(`<div align="center">\n`);
    if (profile.avatarUrl && profile.avatarUrl.trim()) {
      lines.push(`  <img src="${profile.avatarUrl.trim()}" alt="${profile.name}" width="120" style="border-radius: 50%;" />\n`);
    }
    
    // Title & Waving Hand
    const hand = profile.showWavingHand ? ' :wave:' : '';
    lines.push(`  <h1>Hey there, I'm ${profile.name || 'Developer'}${hand}</h1>\n`);

    // Typing effect or tagline
    if (profile.typingEffect && profile.typingTexts && profile.typingTexts.length > 0) {
      const texts = profile.typingTexts.map(t => encodeURIComponent(t.trim())).join(';');
      lines.push(`  <p>`);
      lines.push(`    <a href="https://git.io/typing-svg">`);
      lines.push(`      <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=38BDF8&center=true&vCenter=true&width=435&lines=${texts}" alt="Typing SVG" />`);
      lines.push(`    </a>`);
      lines.push(`  </p>\n`);
    } else if (profile.tagline) {
      lines.push(`  <h3>${profile.tagline}</h3>\n`);
    }

    if (profile.githubStats.showVisitorBadge) {
      lines.push(`  <p>`);
      lines.push(`    <img src="https://komarev.com/ghpvc/?username=${u}&label=Profile%20Views&color=0ea5e9&style=flat-square" alt="Profile Views" />`);
      lines.push(`  </p>\n`);
    }

    lines.push(`</div>\n`);
  } else {
    // Left align
    const hand = profile.showWavingHand ? ' 👋' : '';
    lines.push(`# Hi, I'm ${profile.name || 'Developer'}${hand}\n`);

    if (profile.typingEffect && profile.typingTexts && profile.typingTexts.length > 0) {
      const texts = profile.typingTexts.map(t => encodeURIComponent(t.trim())).join(';');
      lines.push(`[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=38BDF8&width=435&lines=${texts})](https://git.io/typing-svg)\n`);
    } else if (profile.tagline) {
      lines.push(`### ${profile.tagline}\n`);
    }

    if (profile.githubStats.showVisitorBadge) {
      lines.push(`![Profile Views](https://komarev.com/ghpvc/?username=${u}&label=Profile%20Views&color=0ea5e9&style=flat-square)\n`);
    }
  }

  // 3. Bio section
  if (profile.bio && profile.bio.trim()) {
    lines.push(`${profile.bio.trim()}\n`);
  }

  // 4. About Me bullet points
  const ab = profile.aboutMe;
  const hasAbout = ab && (
    ab.workingOn?.title || ab.learning || ab.collaboratingOn || 
    ab.helpWith || ab.askMeAbout || ab.reachingMe || ab.funFact || ab.currentPronouns
  );

  if (hasAbout) {
    lines.push(`## 💫 About Me\n`);
    if (ab.workingOn?.title) {
      if (ab.workingOn.url) {
        lines.push(`- 🔭 I’m currently working on [${ab.workingOn.title}](${ab.workingOn.url})`);
      } else {
        lines.push(`- 🔭 I’m currently working on **${ab.workingOn.title}**`);
      }
    }
    if (ab.learning) lines.push(`- 🌱 I’m currently learning **${ab.learning}**`);
    if (ab.collaboratingOn) lines.push(`- 👯 I’m looking to collaborate on **${ab.collaboratingOn}**`);
    if (ab.helpWith) lines.push(`- 🤝 I’m looking for help with **${ab.helpWith}**`);
    if (ab.askMeAbout) lines.push(`- 💬 Ask me about **${ab.askMeAbout}**`);
    if (ab.reachingMe) lines.push(`- 📫 How to reach me: **${ab.reachingMe}**`);
    if (ab.currentPronouns) lines.push(`- ⚡ Pronouns: **${ab.currentPronouns}**`);
    if (ab.funFact) lines.push(`- ⚡ Fun fact: **${ab.funFact}**`);
    lines.push('');
  }

  // 5. Tech Stack & Skills
  if (profile.skills && profile.skills.length > 0) {
    lines.push(`## 🛠️ Tech Stack & Skills\n`);

    if (profile.skillDisplayMode === 'skillicons') {
      const slugs = profile.skills
        .map(id => SKILL_MAP.get(id)?.iconSlug)
        .filter(Boolean);

      if (slugs.length > 0) {
        const theme = profile.githubStats.theme === 'nord' || profile.githubStats.theme === 'dracula' ? 'dark' : 'dark';
        if (isCenter) lines.push(`<div align="center">`);
        lines.push(`  <a href="https://skillicons.dev">`);
        lines.push(`    <img src="https://skillicons.dev/icons?i=${slugs.join(',')}&theme=${theme}" alt="My Skills" />`);
        lines.push(`  </a>`);
        if (isCenter) lines.push(`</div>`);
        lines.push('');
      }
    } else if (profile.skillDisplayMode === 'grouped_shields') {
      // Group by category
      SKILL_CATEGORIES.forEach(cat => {
        const catSkills = profile.skills
          .map(id => SKILL_MAP.get(id))
          .filter((s): s is NonNullable<typeof s> => !!s && s.category === cat.id);

        if (catSkills.length > 0) {
          lines.push(`**${cat.label}**\n`);
          const badges = catSkills.map(s => {
            const bg = s.badgeBg || '333333';
            const logoCol = s.logoColor || 'white';
            const style = profile.badgeStyle || 'for-the-badge';
            return `![${s.name}](https://img.shields.io/badge/${encodeURIComponent(s.name)}-${bg}?style=${style}&logo=${s.iconSlug}&logoColor=${logoCol})`;
          });
          lines.push(badges.join(' '));
          lines.push('');
        }
      });
    } else {
      // Flat shields list
      const badges = profile.skills
        .map(id => SKILL_MAP.get(id))
        .filter((s): s is NonNullable<typeof s> => !!s)
        .map(s => {
          const bg = s.badgeBg || '333333';
          const logoCol = s.logoColor || 'white';
          const style = profile.badgeStyle || 'for-the-badge';
          return `![${s.name}](https://img.shields.io/badge/${encodeURIComponent(s.name)}-${bg}?style=${style}&logo=${s.iconSlug}&logoColor=${logoCol})`;
        });
      
      if (isCenter) lines.push(`<p align="center">`);
      lines.push(badges.join(' '));
      if (isCenter) lines.push(`</p>`);
      lines.push('');
    }
  }

  // 6. GitHub Stats & Widgets
  const gs = profile.githubStats;
  const anyStatsActive = gs.showStatsCard || gs.showTopLangsCard || gs.showStreakStats || gs.showTrophy || gs.showActivityGraph || gs.showContributionSnake;

  if (anyStatsActive && u) {
    lines.push(`## 📊 GitHub Analytics\n`);
    const theme = gs.theme || 'github_dark';

    if (gs.showTrophy) {
      if (isCenter) lines.push(`<div align="center">`);
      lines.push(`  <a href="https://github.com/ryo-ma/github-profile-trophy">`);
      lines.push(`    <img src="https://github-profile-trophy.vercel.app/?username=${u}&theme=${theme}&no-frame=false&no-bg=true&margin_w=4" alt="${u} Trophies" />`);
      lines.push(`  </a>`);
      if (isCenter) lines.push(`</div>\n`);
    }

    if (gs.showStatsCard || gs.showTopLangsCard || gs.showStreakStats) {
      lines.push(`<p align="${align}">`);
      
      if (gs.showStatsCard) {
        const borderParam = gs.hideBorder ? '&hide_border=true' : '';
        const iconParam = gs.showIcons ? '&show_icons=true' : '';
        const commitsParam = gs.includeAllCommits ? '&include_all_commits=true' : '';
        const countPrivParam = gs.countPrivate ? '&count_private=true' : '';
        lines.push(`  <img src="https://github-readme-stats.vercel.app/api?username=${u}&theme=${theme}${iconParam}${borderParam}${commitsParam}${countPrivParam}" alt="${u}'s GitHub Stats" />`);
      }

      if (gs.showStreakStats) {
        const borderParam = gs.hideBorder ? '&hide_border=true' : '';
        lines.push(`  <img src="https://streak-stats.demolab.com?user=${u}&theme=${theme}${borderParam}" alt="${u}'s GitHub Streak" />`);
      }

      if (gs.showTopLangsCard) {
        const borderParam = gs.hideBorder ? '&hide_border=true' : '';
        lines.push(`  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${u}&layout=compact&theme=${theme}${borderParam}" alt="Top Languages" />`);
      }

      lines.push(`</p>\n`);
    }

    if (gs.showActivityGraph) {
      if (isCenter) lines.push(`<div align="center">`);
      lines.push(`  <a href="https://github.com/ashutosh00710/github-readme-activity-graph">`);
      lines.push(`    <img src="https://github-readme-activity-graph.vercel.app/graph?username=${u}&theme=${theme}&hide_border=${gs.hideBorder}" alt="Activity Graph" />`);
      lines.push(`  </a>`);
      if (isCenter) lines.push(`</div>\n`);
    }

    if (gs.showContributionSnake) {
      if (isCenter) lines.push(`<div align="center">`);
      lines.push(`  <img src="https://raw.githubusercontent.com/${u}/${u}/output/github-contribution-grid-snake.svg" alt="Contribution Snake" />`);
      if (isCenter) lines.push(`</div>\n`);
    }
  }

  // 7. Projects Showcase
  if (profile.projects && profile.projects.length > 0) {
    lines.push(`## 🚀 Featured Projects\n`);
    profile.projects.forEach(p => {
      const featuredBadge = p.featured ? ' ⭐ *Featured*' : '';
      lines.push(`### [${p.title}](${p.repoUrl || '#'}) ${featuredBadge}`);
      if (p.description) {
        lines.push(`${p.description}`);
      }
      
      const metaParts: string[] = [];
      if (p.repoUrl) metaParts.push(`[📁 Repository](${p.repoUrl})`);
      if (p.demoUrl) metaParts.push(`[🌐 Live Demo](${p.demoUrl})`);
      if (typeof p.stars === 'number') metaParts.push(`⭐ ${p.stars} stars`);
      
      if (metaParts.length > 0) {
        lines.push(`\n${metaParts.join(' • ')}`);
      }

      if (p.tags && p.tags.length > 0) {
        const tagBadges = p.tags.map(t => `\`${t.trim()}\``).join(' ');
        lines.push(`\n**Built with:** ${tagBadges}`);
      }
      lines.push('');
    });
  }

  // 8. Connect / Social Links
  const soc = profile.socialLinks || {};
  const socialEntries: { key: string; name: string; url: string; logo: string; color: string }[] = [];

  if (soc.github) socialEntries.push({ key: 'github', name: 'GitHub', url: `https://github.com/${soc.github.replace('@', '')}`, logo: 'github', color: '181717' });
  if (soc.linkedin) socialEntries.push({ key: 'linkedin', name: 'LinkedIn', url: soc.linkedin.startsWith('http') ? soc.linkedin : `https://linkedin.com/in/${soc.linkedin}`, logo: 'linkedin', color: '0077B5' });
  if (soc.twitter) socialEntries.push({ key: 'twitter', name: 'Twitter', url: soc.twitter.startsWith('http') ? soc.twitter : `https://twitter.com/${soc.twitter.replace('@', '')}`, logo: 'x', color: '000000' });
  if (soc.discord) socialEntries.push({ key: 'discord', name: 'Discord', url: soc.discord.startsWith('http') ? soc.discord : `https://discord.gg/${soc.discord}`, logo: 'discord', color: '5865F2' });
  if (soc.youtube) socialEntries.push({ key: 'youtube', name: 'YouTube', url: soc.youtube.startsWith('http') ? soc.youtube : `https://youtube.com/@${soc.youtube}`, logo: 'youtube', color: 'FF0000' });
  if (soc.portfolio) socialEntries.push({ key: 'portfolio', name: 'Portfolio', url: soc.portfolio.startsWith('http') ? soc.portfolio : `https://${soc.portfolio}`, logo: 'googlechrome', color: '4285F4' });
  if (soc.email) socialEntries.push({ key: 'email', name: 'Email', url: `mailto:${soc.email}`, logo: 'gmail', color: 'EA4335' });
  if (soc.leetcode) socialEntries.push({ key: 'leetcode', name: 'LeetCode', url: soc.leetcode.startsWith('http') ? soc.leetcode : `https://leetcode.com/${soc.leetcode}`, logo: 'leetcode', color: 'FFA116' });
  if (soc.medium) socialEntries.push({ key: 'medium', name: 'Medium', url: soc.medium.startsWith('http') ? soc.medium : `https://medium.com/@${soc.medium}`, logo: 'medium', color: '000000' });
  if (soc.devto) socialEntries.push({ key: 'devto', name: 'Dev.to', url: soc.devto.startsWith('http') ? soc.devto : `https://dev.to/${soc.devto}`, logo: 'devdotto', color: '0A0A0A' });
  if (soc.buymeacoffee) socialEntries.push({ key: 'buymeacoffee', name: 'Buy Me A Coffee', url: soc.buymeacoffee.startsWith('http') ? soc.buymeacoffee : `https://buymeacoffee.com/${soc.buymeacoffee}`, logo: 'buymeacoffee', color: 'FFDD00' });

  if (socialEntries.length > 0) {
    lines.push(`## 🤝 Connect With Me\n`);
    const style = profile.badgeStyle || 'for-the-badge';
    const badges = socialEntries.map(s => {
      return `[![${s.name}](https://img.shields.io/badge/${encodeURIComponent(s.name)}-${s.color}?style=${style}&logo=${s.logo}&logoColor=white)](${s.url})`;
    });

    if (isCenter) lines.push(`<p align="center">`);
    lines.push(badges.join(' '));
    if (isCenter) lines.push(`</p>`);
    lines.push('');
  }

  // 9. Add-ons: Quote & Joke
  if (profile.addons) {
    if (profile.addons.devQuote) {
      lines.push(`## 💡 Daily Dev Quote\n`);
      const theme = profile.githubStats.theme || 'github_dark';
      lines.push(`![Quote](https://quotes-github-readme.vercel.app/api?type=horizontal&theme=${theme})\n`);
    }

    if (profile.addons.devJoke) {
      lines.push(`## 🤣 Dev Joke\n`);
      const theme = profile.githubStats.theme || 'github_dark';
      lines.push(`![Jokes Card](https://readme-jokes.vercel.app/api?theme=${theme})\n`);
    }

    if (profile.addons.customMarkdown && profile.addons.customMarkdown.trim()) {
      lines.push(profile.addons.customMarkdown.trim() + '\n');
    }
  }

  // Footer credit
  lines.push(`---\n<p align="center">⭐️ Generated with <a href="https://github.com">OctoProfile</a></p>`);

  return lines.join('\n');
}
