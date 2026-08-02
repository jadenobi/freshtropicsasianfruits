const fs = require('fs');

const path = 'src/components/Header.tsx';
let content = fs.readFileSync(path, 'utf8');

const importStatement = `import { Search, Heart, Home, ShoppingBag, TreePine, Flower, Package, Newspaper, ArrowRightLeft, Info, RefreshCw, Globe, Smartphone, PlaySquare, Mail, Gift, MessageCircle, BarChart3, Apple } from 'lucide-react'`;
content = content.replace(/import Link from 'next\/link'/, `import Link from 'next/link'\n${importStatement}`);

content = content.replace(/🎬 Videos/g, '<PlaySquare size={16} className="inline mr-1" /> Videos');
content = content.replace(/🌍 Seasonal/g, '<Globe size={16} className="inline mr-1" /> Seasonal');
content = content.replace(/📱 Mobile App/g, '<Smartphone size={16} className="inline mr-1" /> Mobile App');
content = content.replace(/📱 App/g, '<Smartphone size={16} className="inline mr-1" /> App');
content = content.replace(/🎁 Rewards Program/g, '<Gift size={16} className="inline mr-1" /> Rewards Program');
content = content.replace(/🎁 Rewards/g, '<Gift size={16} className="inline mr-1" /> Rewards');
content = content.replace(/🔄 Subscribe & Save/g, '<RefreshCw size={16} className="inline mr-1" /> Subscribe & Save');
content = content.replace(/🔄 Subscribe/g, '<RefreshCw size={16} className="inline mr-1" /> Subscribe');
content = content.replace(/ℹ️ About/g, '<Info size={16} className="inline mr-1" /> About');
content = content.replace(/📧 Contact/g, '<Mail size={16} className="inline mr-1" /> Contact');
content = content.replace(/🔍/g, '<Search size={20} />');
content = content.replace(/🤍/g, '<Heart fill="currentColor" />');
content = content.replace(/🏠 Home/g, '<Home size={18} className="inline mr-2" /> Home');
content = content.replace(/🛒 Shop/g, '<ShoppingBag size={18} className="inline mr-2" /> Shop');
content = content.replace(/🌳 Trees/g, '<TreePine size={18} className="inline mr-2" /> Trees');
content = content.replace(/🌸 Pink Glow Pineapple/g, '<Flower size={18} className="inline mr-2" /> Pink Glow Pineapple');
content = content.replace(/📦 Build Your Own Box/g, '<Package size={18} className="inline mr-2" /> Build Your Own Box');
content = content.replace(/📰 Blog/g, '<Newspaper size={18} className="inline mr-2" /> Blog');
content = content.replace(/🍎 Compare/g, '<ArrowRightLeft size={18} className="inline mr-2" /> Compare');
content = content.replace(/✉️ Email Marketing/g, '<Mail size={16} className="inline mr-1" /> Email Marketing');
content = content.replace(/💬 Live Chat/g, '<MessageCircle size={16} className="inline mr-1" /> Live Chat');
content = content.replace(/📊 Admin/g, '<BarChart3 size={16} className="inline mr-1" /> Admin');

fs.writeFileSync(path, content, 'utf8');
console.log("Successfully replaced all header emojis with Lucide React icons.");
